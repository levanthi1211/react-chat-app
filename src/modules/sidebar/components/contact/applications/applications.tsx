import { FC } from "react";
import { CloseIcon } from "@/shared/components/icons/closeIcon";
import _ from "lodash";
import { useApplications } from "./useApplications";
import { AcceptIcon } from "@/shared/components/icons/acceptIcon";
import { useContact } from "../useContact";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectTheme } from "../../../../settings/components/themes/themesSlice";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";

interface ApplicationsProps {
  onClose: any;
}

export const Applications: FC<ApplicationsProps> = (props) => {
  const { onClose } = props;
  const { data, methods } = useApplications();
  const { loading, applications } = data;
  const { handleAcceptRequest, handleRejectRequest } = methods;
  // const { data: contactData } = useContact();

  // const { count, loading: contactLoading, error: contactError } = contactData;

  const { themeColor } = useAppSelector(selectTheme);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
      <div className="w-[500px] bg-white rounded">
        <div className="flex justify-between p-6 items-center w-full border-b border-slate-100">
          <div>Applications ({applications.length})</div>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseIcon className="h-4" />
          </div>
        </div>
        <div className="border-b border-slate-100 max-h-[300px] overflow-y-scroll">
          {applications.length === 0 && (
            <div className="h-[298px] flex items-center justify-center">
              <span>You dont have any applications</span>
            </div>
          )}
          {loading === "LOADING" && (
            <div className="h-[298px] flex items-center justify-center">
              <span>Loading</span>
            </div>
          )}
          {loading === "COMPLETE" &&
            applications.length > 0 &&
            applications
              .filter((application: any) => application.status === "PENDING")
              .map((application: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center cursor-pointer rounded p-5 border-b border-slate-100"
                  >
                    <div className="flex justify-start items-center gap-4 my-2">
                      <div
                        className="rounded-full relative h-10 w-10 bg-cover"
                        style={{
                          backgroundImage: `url(${
                            application.photoURL || avatarPlaceholder
                          })`,
                        }}
                      ></div>
                      <div>
                        <span className="text-[#6A636C] text-sm font-bold noselect">
                          {application.name || "((Unamed))"}
                        </span>
                        <br />
                        <span className="text-[#6A636C] text-sm noselect">
                          {application.email}
                        </span>
                        <br />
                        <p className="text-[#1c1c1b] text-sm noselect pt-2 line-clamp-3 w-[300px]">
                          <strong>Message:</strong> {application.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end items-center gap-6">
                      {application.loadingState === "LOADING" ? (
                        <span className="text-red-500">Loading ...</span>
                      ) : (
                        <div
                          onClick={() => handleRejectRequest(application.id)}
                        >
                          <CloseIcon className="h-5 fill-red-400" />
                        </div>
                      )}
                      {application.acceptLoadingState === "LOADING" ? (
                        <span className="text-green-500">Loading ...</span>
                      ) : (
                        <div
                          onClick={() => handleAcceptRequest(application.id)}
                        >
                          <AcceptIcon className="h-5 fill-green-400" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="flex items-center justify-center p-2">
          <button
            className="px-4 py-2 text-white rounded"
            onClick={onClose}
            style={{ backgroundColor: `${themeColor}` }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
