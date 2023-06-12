import { getProfileInformationService } from "./profile.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/infra/redux/store";
import { loadingState } from "@/shared/constants/loadingState";

interface ProfileState {
  getProfileLoadingState: loadingState;
  profile: any;
}

const initialState: ProfileState = {
  getProfileLoadingState: "IDLE",
  profile: null,
};

export const getProfileInformationAction = createAsyncThunk(
  "profile/getInfo",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProfileInformationService();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileInformation: (state, action) => {
      console.log(action);
      state.profile = action.payload.data.profile;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInformationAction.fulfilled, (state, action) => {
        state.getProfileLoadingState = "COMPLETE";
        profileSlice.caseReducers.setProfileInformation(state, action);
      })
      .addCase(getProfileInformationAction.pending, (state, _action) => {
        state.getProfileLoadingState = "LOADING";
      })
      .addCase(getProfileInformationAction.rejected, (state, _action) => {
        state.getProfileLoadingState = "ERROR";
      });
  },
});

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
