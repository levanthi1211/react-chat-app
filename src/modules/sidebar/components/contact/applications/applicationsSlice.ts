import {
  getAllApplicationsService,
  rejectRequestService,
  RejectRequestReq,
  acceptRequestService,
  AcceptRequestReq,
} from "./applications.service";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/infra/redux/store";
import { loadingState } from "@/shared/constants/loadingState";

interface ApplicationsState {
  loadingState: loadingState;
  applications: Array<any>;
}

const initialState: ApplicationsState = {
  loadingState: "IDLE",
  applications: [],
};

export const getAllApplicationsAction = createAsyncThunk(
  "applications/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllApplicationsService();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const rejectRequestAction = createAsyncThunk(
  "applications/reject",
  async (req: RejectRequestReq, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        applicationsSlice.actions.setApplicationLoadingState({
          ...req,
          loadingState: "LOADING",
        })
      );
      const data = await rejectRequestService(req);
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const acceptRequestAction = createAsyncThunk(
  "applications/accept",
  async (req: AcceptRequestReq, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        applicationsSlice.actions.setApplicationLoadingState({
          ...req,
          acceptLoadingState: "LOADING",
        })
      );
      const data = await acceptRequestService(req);
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload.data.applications;
    },
    setApplicationLoadingState: (state, action) => {
      const { sender, loadingState, acceptLoadingState } = action.payload;
      const applicationIndex = current(state.applications).findIndex(
        (_application) => {
          return _application.id === sender;
        }
      );
      if (applicationIndex >= 0) {
        if (loadingState)
          state.applications[applicationIndex].loadingState = loadingState;
        if (acceptLoadingState)
          state.applications[applicationIndex].acceptLoadingState =
            acceptLoadingState;
      }
    },
    deleteApplication: (state, action) => {
      const { sender } = action.payload;
      const applicationIndex = current(state.applications).findIndex(
        (_application) => {
          return _application.id === sender;
        }
      );
      if (applicationIndex >= 0) {
        state.applications.splice(applicationIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllApplicationsAction.fulfilled, (state, action) => {
        state.loadingState = "COMPLETE";
        applicationsSlice.caseReducers.setApplications(state, action);
      })
      .addCase(getAllApplicationsAction.pending, (state, action) => {
        state.loadingState = "LOADING";
      })
      .addCase(getAllApplicationsAction.rejected, (state, action) => {
        state.loadingState = "ERROR";
      });

    builder.addCase(rejectRequestAction.fulfilled, (state, action) => {
      const { sender } = action.payload;
      applicationsSlice.caseReducers.setApplicationLoadingState(state, {
        ...action,
        payload: {
          ...action.payload,
          sender,
          loadingState: "COMPLETE",
        },
      });
      applicationsSlice.caseReducers.deleteApplication(state, {
        ...action,
        payload: {
          ...action.payload,
          sender,
        },
      });
    });

    builder.addCase(acceptRequestAction.fulfilled, (state, action) => {
      const { sender } = action.payload;
      applicationsSlice.caseReducers.setApplicationLoadingState(state, {
        ...action,
        payload: {
          ...action.payload,
          sender,
          acceptLoadingState: "COMPLETE",
        },
      });
      applicationsSlice.caseReducers.deleteApplication(state, {
        ...action,
        payload: {
          ...action.payload,
          sender,
        },
      });
    });
  },
});

export const selectApplications = (state: RootState) => state.applications;

export default applicationsSlice.reducer;
