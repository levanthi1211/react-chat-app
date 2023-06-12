import { getListContactsService } from "./contact.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/infra/redux/store";
import { loadingState } from "@/shared/constants/loadingState";

interface ContactState {
  loadingState: loadingState;
  contacts: Array<any>;
}

const initialState: ContactState = {
  loadingState: "IDLE",
  contacts: [],
};

export const getContactAction = createAsyncThunk(
  "contact/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getListContactsService();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.contacts = action.payload.listContacts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactAction.fulfilled, (state, action) => {
        state.loadingState = "COMPLETE";
        contactSlice.caseReducers.setContact(state, action);
      })
      .addCase(getContactAction.pending, (state, action) => {
        state.loadingState = "LOADING";
      })
      .addCase(getContactAction.rejected, (state, action) => {
        state.loadingState = "ERROR";
      });
  },
});

export const selectContact = (state: RootState) => state.contact;

export default contactSlice.reducer;
