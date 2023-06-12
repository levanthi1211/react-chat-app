import { ChangeEvent, FC, FormEvent, useState } from "react";
import { CloseIcon } from "@/shared/components/icons/closeIcon";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { getProfileInformationAction } from "../../profile/profileSlice";
import _ from "lodash";
import clsx from "clsx";
import { startConversationService } from "./addMessage.service";
import { useAddMessage } from "./useAddMessage";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";

interface AddMessageProps {
  onClose: any;
}

export const AddMessage: FC<AddMessageProps> = (props) => {
  const { onClose } = props;
  const afterSubmit = () => {
    console.log("cac");
    onClose();
  };

  const { data, methods } = useAddMessage({ afterSubmit });
  const { searchedContacts, dirtyFields, mountedContact } = data;
  const { handleSearchContacts, setMountedContact } = methods;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
      <div className="w-[500px] bg-white rounded">
        <div className="flex justify-between p-6 items-center w-full border-b border-slate-100">
          <div>Start Conversation</div>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseIcon className="h-4" />
          </div>
        </div>
        <form onSubmit={methods.handleAddMessage} autoComplete="off">
          <div className="p-6">
            {!mountedContact && (
              <input
                className="w-full bg-[#f6f6f9] border-0 rounded text-[13px] font-thin"
                type="text"
                placeholder="Enter email here..."
                {...data.register("keyword", {
                  required: true,
                  onChange: (e) => handleSearchContacts(e.target.value),
                })}
              />
            )}
            {mountedContact && (
              <div className="flex justify-between border border-primary transition-all duration-100 items-center cursor-pointer rounded p-2">
                <div className="flex justify-start items-center gap-2 my-2">
                  <div
                    className="rounded-full relative h-10 w-10 bg-cover"
                    style={{
                      backgroundImage: `url(${
                        mountedContact.photoURL || avatarPlaceholder
                      })`,
                    }}
                  >
                    <div className="absolute top-[70%] left-[70%] h-3 w-3 border-2 border-white rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="text-[#6A636C] text-sm font-bold noselect">
                      {mountedContact.name || "((Unamed))"}
                    </span>
                    <br />
                    <span className="text-[#6A636C] text-sm noselect">
                      {mountedContact.email}
                    </span>
                    <br />
                  </div>
                </div>
                <div onClick={() => setMountedContact(null)}>
                  <CloseIcon className="fill-primary h-4" />
                </div>
              </div>
            )}
            {dirtyFields.keyword &&
              (!searchedContacts || searchedContacts.length === 0) &&
              !mountedContact && (
                <span className="text-red-400 text-[11px]">
                  * User does not exist
                </span>
              )}
            {searchedContacts &&
              searchedContacts?.length > 0 &&
              dirtyFields.keyword &&
              !mountedContact && (
                <>
                  <h1 className="inline-block py-2 font-bold text-primary">
                    Result:
                  </h1>
                  {searchedContacts.map((contact: any, index: number) => {
                    return (
                      <div
                        className={clsx(
                          "flex justify-between border-b border-primary transition-all duration-100 items-center cursor-pointer p-2 hover:bg-primary !hover:text-white"
                        )}
                        onClick={() => {
                          setMountedContact(contact);
                        }}
                        key={index}
                      >
                        <div className="flex justify-start items-center gap-2 my-2">
                          <div
                            className="rounded-full relative h-10 w-10 bg-cover"
                            style={{
                              backgroundImage: `url(${
                                contact.photoURL || avatarPlaceholder
                              })`,
                            }}
                          ></div>
                          <div>
                            <span className="text-[#6A636C] text-sm font-bold noselect">
                              {contact.name || "((Unamed))"}
                            </span>
                            <br />
                            <span className="text-[#6A636C] text-sm noselect">
                              {contact.email}
                            </span>
                            <br />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
          </div>

          <div className="flex justify-end items-center w-full p-6 pt-4 gap-3 border-t border-slate-100">
            <button
              className="px-4 py-2 text-primary bg-white border border-primary rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            {data.addMessageLoading === "LOADING" && (
              <button
                className="px-4 py-2 text-white bg-primary rounded flex justify-center items-center gap-4"
                type="submit"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Sending...
              </button>
            )}
            {data.addMessageLoading !== "LOADING" && (
              <button
                className="px-4 py-2 text-white bg-primary rounded disabled:bg-primary/20"
                type="submit"
                disabled={mountedContact ? false : true}
              >
                Start
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
