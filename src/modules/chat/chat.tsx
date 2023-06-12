import { FC, useRef, useEffect } from "react";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { useMessages } from "../sidebar/components/messages/useMessage";
import { Message } from "./components/message";
import { UserChatPlaceholder } from "./components/userChatPlaceholder";
import { selectChat } from "./chatSlice";
import { useChat } from "./useChat";
import moment from "moment";
import { selectTheme } from "../settings/components/themes/themesSlice";
import { selectMenu } from "../menu/redux/menuSlice";
import { TextEditor } from "./components/textEditor";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";

export const Chat: FC = () => {
  const { data } = useMessages();
  const sidebarState = useAppSelector(selectMenu);
  const { activeMenu } = sidebarState;
  const { backgroundPatternType } = useAppSelector(selectTheme);

  const { currentConversation } = useAppSelector(selectChat);

  const { conversations, loading } = data;
  const bottomRef = useRef<null | HTMLDivElement>(null);

  const { data: userChatData, methods: userChatMethods } = useChat();

  const conversation = conversations.find(
    (conversation) => conversation.conversationId === currentConversation
  );

  const { conversationDetail } = userChatData;
  const messages = conversationDetail?.messages;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  if (activeMenu !== "MESSAGES" || !conversation) {
    return <UserChatPlaceholder />;
  }

  const onEditorStateChange = (editorState: string) => {
    userChatMethods.setValue("message", editorState);
  };

  const editorContent = userChatMethods.watch("message");

  return (
    <div
      className="h-full grow flex flex-col bg-slate-300 dark:bg-slate-700"
      style={{
        backgroundImage: `url(/assets/images/bg-pattern/pattern-0${backgroundPatternType}.png)`,
      }}
    >
      <div className="w-full p-6 flex items-center justify-between border-b border-slate-100 shrink-0">
        <div className="flex justify-between items-center cursor-pointer">
          <div className="flex justify-start items-center gap-2 my-2">
            <div
              className="rounded-full relative h-12 w-12 bg-cover"
              style={{
                backgroundImage: `url(${
                  conversation?.photoURL || avatarPlaceholder
                })`,
              }}
            >
              {conversation.status === "online" && (
                <div className="absolute top-[70%] left-[70%] h-[13px] w-[13px] border-2 border-white rounded-full bg-green-500"></div>
              )}
              {conversation.status === "offline" && (
                <div className="absolute top-[70%] left-[70%] h-[13px] w-[13px] border-2 outline-white bg-white rounded-full border-slate-600"></div>
              )}
            </div>
            <div>
              <span className="text-[#6A636C] text-sm font-bold noselect">
                {conversation?.conversationName}
              </span>
              <br />
              {conversation.status === "online" && (
                <span className="text-[#6A636C] text-xs noselect">Online</span>
              )}
              {conversation.status === "offline" && (
                <span className="text-[#6A636C] text-xs noselect">
                  Last seen:{" "}
                  {moment(conversation.lastSeen.toDate().toString()).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div>Search</div>
          <div>Call</div>
          <div>Video</div>
          <div>Info</div>
          <div>Action</div>
        </div>
      </div>
      <div className="grow overflow-y-scroll scroll-smooth w-full">
        {loading === "COMPLETE" &&
          conversationDetail &&
          conversationDetail.messages.map((message: string, index: number) => {
            return <Message key={index} message={message} />;
          })}
        <div ref={bottomRef}></div>
      </div>
      <div className="shrink-0 p-6 border-t border-[#eaeaf1]">
        <TextEditor
          editorContent={editorContent}
          onEditorStateChange={onEditorStateChange}
          onSubmit={userChatMethods.handleSendMessage}
          setFiles={userChatMethods.setFiles}
        />
      </div>
    </div>
  );
};
