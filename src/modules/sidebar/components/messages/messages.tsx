import clsx from "clsx";
import { FC, useState } from "react";
import { PlusIcon } from "@/shared/components/icons/plusIcon";
import { ConversationMask, Conversations } from "./message.service";
import { AddMessage } from "./modalAddMessages/modalAddMessage";
import { useMessages } from "./useMessage";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";

export const Messages: FC = () => {
  const [isOpenMessageModal, setOpenMessageModal] = useState<boolean>(false);
  const { data, methods } = useMessages();
  const { loading, conversations, currentConversation } = data;
  const { handleSetCurrentConversation } = methods;
  console.log(conversations, currentConversation);
  return (
    <div className="w-full h-full shadow-[10px_0px_60px_-15px_rgba(0,0,0,0.3)] px-4">
      <div className="w-full">
        <div className="w-full h-auto flex justify-between items-center py-4">
          <h1 className="font-[600] text-[18px] text-[#495057]">Chats</h1>
          <div
            className="cursor-pointer bg-primary/20 w-8 h-8 flex justify-center items-center rounded hover:bg-primary group"
            onClick={() => setOpenMessageModal(true)}
          >
            <PlusIcon className="h-4 group-hover:fill-[white] fill-primary" />
          </div>
        </div>
      </div>
      <div className="py-4">
        <input
          className="w-full bg-[#f6f6f9] border-0 rounded text-[13px] font-thin"
          type="text"
          placeholder="Search Here..."
        />
      </div>
      <div className="pt-1 pb-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xs text-[#79798c] font-[500]">DIRECT MESSAGES</h3>
          <div className="cursor-pointer bg-primary/20 w-8 h-8 flex justify-center items-center rounded hover:bg-primary group">
            <PlusIcon className="h-4 group-hover:fill-white fill-primary" />
          </div>
        </div>
        {conversations.map((conversation: ConversationMask, index: any) => {
          return (
            <div
              key={index}
              className={clsx(
                "flex justify-between items-center cursor-pointer -mx-4 px-4",
                [
                  currentConversation === conversation.conversationId &&
                    "bg-primary",
                ]
              )}
              onClick={() =>
                handleSetCurrentConversation(conversation.conversationId)
              }
            >
              <div className="flex justify-start items-center gap-2 my-2">
                <div
                  className="rounded-full relative h-10 w-10 bg-cover"
                  style={{
                    backgroundImage: `url(${
                      conversation.photoURL || avatarPlaceholder
                    })`,
                  }}
                >
                  {conversation.status === "online" && (
                    <div className="absolute top-[70%] left-[70%] h-3 w-3 border-2 border-white rounded-full bg-green-500"></div>
                  )}
                </div>
                <div>
                  <span
                    className={clsx(
                      "text-[#6A636C] text-sm font-bold noselect",
                      [
                        currentConversation === conversation.conversationId &&
                          "!text-white",
                      ]
                    )}
                  >
                    {conversation.conversationName}
                  </span>
                </div>
              </div>
              {/* <span className="px-1 rounded bg-red-400 text-white text-[11px] inline-block">
                  3
                </span> */}
            </div>
          );
        })}
      </div>
      <div className="pt-1 pb-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xs text-[#79798c] font-[500]">CHANNELS</h3>
          <div className="cursor-pointer bg-primary/20 w-8 h-8 flex justify-center items-center rounded hover:bg-primary group">
            <PlusIcon className="h-4 group-hover:fill-[white] fill-primary" />
          </div>
        </div>
        <div className="flex justify-between items-center cursor-pointer">
          <div className="flex justify-start items-center gap-2 my-2">
            <div
              className="rounded-full relative h-10 w-10"
              style={{
                backgroundImage: `url(https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250)`,
              }}
            >
              <div className="absolute top-[70%] left-[70%] h-3 w-3 border-2 border-white rounded-full bg-green-500"></div>
            </div>
            <div>
              <span className="text-[#6A636C] text-sm font-bold noselect">
                Marguerite Campbell
              </span>
            </div>
          </div>
          <span className="px-1 rounded bg-red-400 text-white text-[11px] inline-block">
            3
          </span>
        </div>
        <div className="flex justify-between items-center cursor-pointer">
          <div className="flex justify-start items-center gap-2 my-2">
            <div
              className="rounded-full relative h-10 w-10"
              style={{
                backgroundImage: `url(https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250)`,
              }}
            >
              <div className="absolute top-[70%] left-[70%] h-3 w-3 border-2 border-white rounded-full bg-green-500"></div>
            </div>
            <div>
              <span className="text-[#6A636C] text-sm font-bold noselect">
                Marguerite Campbell
              </span>
            </div>
          </div>
          <span className="px-1 rounded bg-red-400 text-white text-[11px] inline-block">
            3
          </span>
        </div>
      </div>
      {isOpenMessageModal && (
        <AddMessage onClose={() => setOpenMessageModal(false)} />
      )}
    </div>
  );
};
