import { FC, useState } from "react";
import { ActionIcon } from "@/shared/components/icons";
import { PlusIcon } from "@/shared/components/icons/plusIcon";
import { Applications } from "./applications/applications";
import { RequestContact } from "./requestContact/modalRequestContact";
import { useContact } from "./useContact";
import { ConfirmDeleteContact } from "./confirmDeleteContact/confirmDeleteContact";
import clsx from "clsx";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";

export const Contact: FC = () => {
  const [isOpenRequestContactModal, setOpenRequestContactModal] =
    useState<boolean>(false);
  const [isOpenApplications, setOpenApplications] = useState<boolean>(false);
  const [isOpenConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

  const [openAction, setOpenAction] = useState<string>("");

  const { data, methods } = useContact();
  const { count, loading, error, contactLoading, searchedContacts } = data;
  const { handleSearchContacts, handleDeleteContact } = methods;

  return (
    <div className="w-full h-full shadow-[10px_0px_60px_-15px_rgba(0,0,0,0.3)] px-4">
      <div className="w-full">
        <div className="w-full h-auto flex justify-between items-center py-4">
          <h1 className="font-[600] text-[18px] text-[#495057]">Contact</h1>
          <div className="flex justify-end items-center gap-2">
            <button
              className={clsx(
                "relative cursor-pointer px-2 h-8 flex justify-center items-center rounded bg-primary/20 hover:bg-primary transition-all duration-300 group"
              )}
              onClick={() => setOpenApplications(true)}
            >
              {!!count && loading === "COMPLETE" && error === "" && (
                <div className="absolute -top-2 left-[calc(100%_-_0.5rem)] text-[10px] w-4 h-4 rounded-full bg-red-400 flex justify-center items-center text-white">
                  <span>{count}</span>
                </div>
              )}
              <span className="group-hover:text-white text-primary">
                Applications
              </span>
            </button>
            <div
              className={clsx(
                "cursor-pointer bg-primary/20 w-8 h-8 flex justify-center items-center rounded hover:bg-primary group",
                []
              )}
              onClick={() =>
                setOpenRequestContactModal((_isOpen: boolean) => true)
              }
            >
              <PlusIcon className="h-4 group-hover:fill-[white] fill-[#92af9c]" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <input
          className="w-full bg-[#f6f6f9] border-0 rounded text-[13px] font-thin"
          type="text"
          placeholder="Search Contacts..."
          onChange={(e) => handleSearchContacts(e.target.value)}
        />
      </div>
      <div className="pt-1 pb-8">
        {contactLoading === "COMPLETE" &&
          searchedContacts.map((contact: any, index: number) => {
            if (contact.listByCharacter.length > 0)
              return (
                <div key={index}>
                  <div className="relative flex py-2 items-center">
                    <span className="flex-shrink mr-4 text-primary font-bold text-[14px] noselect">
                      {contact.character.toUpperCase()}
                    </span>
                    <div className="flex-grow border-t border-[#f6f6f9]"></div>
                  </div>
                  <div>
                    {contact.listByCharacter
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center cursor-pointer"
                          >
                            <div className="flex justify-start items-center gap-2 my-2">
                              <div
                                className="rounded-full relative h-10 w-10"
                                style={{
                                  backgroundImage: `url(${
                                    item.photoURL || avatarPlaceholder
                                  })`,
                                }}
                              >
                                <div className="absolute top-[70%] left-[70%] h-3 w-3 border-2 border-white rounded-full bg-green-500"></div>
                              </div>
                              <div>
                                <span className="text-[#6A636C] text-sm font-bold noselect">
                                  {item.name || "((Unamed))"}
                                </span>
                                <br />
                                <span className="text-[#6A636C] text-sm noselect">
                                  {item.email}
                                </span>
                                <br />
                              </div>
                            </div>
                            <div
                              className="relative w-8 h-8 rounded-full hover:bg-primary/20 flex items-center justify-center"
                              onClick={() => {
                                setOpenAction((openAction) => {
                                  if (openAction === item.id) return "";
                                  return item.id;
                                });
                              }}
                            >
                              <ActionIcon className="h-4 cursor-pointer fill-primary" />
                              {openAction === item.id && (
                                <div className="absolute z-[5] top-0 left-full bg-white rounded shadow-md py-2">
                                  <div
                                    className="px-6 py-1 noselect"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    Block
                                  </div>
                                  <div
                                    className="px-6 py-1 noselect"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      setOpenConfirmDelete(true);
                                    }}
                                  >
                                    Delete
                                  </div>
                                  <div
                                    className="px-6 py-1 noselect"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    Edit
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
          })}
      </div>
      {isOpenRequestContactModal && (
        <RequestContact
          onClose={() => setOpenRequestContactModal((_isOpen) => false)}
        />
      )}
      {isOpenApplications && (
        <Applications onClose={() => setOpenApplications((_isOpen) => false)} />
      )}
      {isOpenConfirmDelete && (
        <ConfirmDeleteContact
          onClose={() => setOpenConfirmDelete(false)}
          id={openAction}
          handleDelete={handleDeleteContact}
        />
      )}
    </div>
  );
};
