import {
  selectApplications,
  rejectRequestAction,
  acceptRequestAction,
} from "./applicationsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/infra/redux/hooks";

export const useApplications = () => {
  const dispatch = useAppDispatch();
  const applicationsState = useAppSelector(selectApplications);
  const { loadingState, applications } = applicationsState;

  const handleRejectRequest = async (sender: string) => {
    await dispatch(rejectRequestAction({ sender }));
  };

  const handleAcceptRequest = async (sender: string) => {
    await dispatch(acceptRequestAction({ sender }));
  };

  const data = {
    loading: loadingState,
    applications,
  };

  const methods = {
    handleAcceptRequest,
    handleRejectRequest,
  };

  return {
    data,
    methods,
  };
};
