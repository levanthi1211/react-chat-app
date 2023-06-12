import clsx from "clsx";
import { FC, useState, useRef, useCallback } from "react";
import { SmileIcon } from "@/shared/components/icons/smileIcon";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectProfile } from "../../sidebar/components/profile/profileSlice";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import moment from "moment";
import { useOnClickOutside } from "usehooks-ts";
import { useChat } from "../useChat";
import iconData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { init } from "emoji-mart";

init({ data: iconData });

const avatarPlaceholder =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

const listEmoji: Array<string> = [
  "2764-fe0f",
  "1f44d",
  "1f44e",
  "1f621",
  "1f606",
  "1f62e",
  "1f62e",
];

interface IMessageProps {
  message: any;
}

export const Message: FC<IMessageProps> = (props) => {
  const profileState = useAppSelector(selectProfile);
  const [openReaction, setOpenReaction] = useState<false>(false);
  const { profile } = profileState;
  const { message } = props;
  const [isOpenEmoji, setOpenEmoji] = useState<boolean>(false);
  const { data, methods } = useChat();

  const iconRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setOpenEmoji(false);
  };
  useOnClickOutside(iconRef, clickOutsidehandler);

  const mappedReaction = useCallback(
    (reactions: Array<any>) => {
      const mappedResult: Array<any> = [];

      reactions.forEach((reaction) => {
        const { iconId, userId } = reaction;
        const checkExist = mappedResult.findIndex(
          (result) => result.iconId === iconId
        );
        if (checkExist < 0) {
          mappedResult.push({
            iconId,
            users: [userId],
          });
        } else {
          mappedResult[checkExist] = {
            ...mappedResult[checkExist],
            users: [...mappedResult[checkExist].users, userId],
          };
        }
      });
      return mappedResult;
    },
    [message]
  );

  return (
    <div
      className={clsx("flex items-center rounded p-5 w-full", [
        message.self ? "justify-end" : "justify-start",
      ])}
    >
      <div
        className={clsx("flex justify-start items-start gap-4 my-2 w-full", [
          message.self ? "flex-row-reverse" : "",
        ])}
      >
        <div
          className="rounded-full relative h-10 w-10 bg-cover"
          style={{
            backgroundImage: `url(${
              message.self
                ? profile.photoURL || avatarPlaceholder
                : message.userDetail.photoURL || avatarPlaceholder
            })`,
          }}
        ></div>
        <div
          className={clsx("flex flex-col max-w-[50%]", [
            message.self && "items-end",
          ])}
        >
          <span
            className={clsx(
              "text-[#6A636C] text-sm font-bold noselect inline-block pb-1"
            )}
          >
            {message.self
              ? profile.name || "((Unamed))"
              : message.userDetail.name || "((Unamed))"}
          </span>
          <span className="text-[#6A636C] text-[11px] inline-block pb-1">
            {moment(message.time.toDate().toString()).format(
              "DD/MM/YYYY HH:mm:ss"
            )}
          </span>
          <div
            className={clsx("flex items-center gap-4 group relative", [
              message.self
                ? "flex-row-reverse justify-end"
                : "flex-row justify-start",
            ])}
          >
            {message.message && (
              <div
                className={clsx(
                  "p-[12px_20px] rounded shadow-md text-[#495057] font-[400] text-[15px]",
                  [message.self ? "bg-primary/[0.23]" : "bg-white"]
                )}
                dangerouslySetInnerHTML={{ __html: message.message }}
              />
            )}
            {message.files &&
              message.files.length > 0 &&
              message.files.map((file: any) => {
                const { type, name, downloadUrl } = file;
                const generalType = type.split("/")[0];
                return (
                  <div className="h-[80px] w-fit bg-white shadow-md relative group rounded">
                    {generalType !== "image" && (
                      <div className="p-2">
                        <span className="text-[13px] font-thin text-[#111]">
                          {name}
                        </span>
                      </div>
                    )}
                    {generalType === "image" && (
                      <div
                        className="max-h-[80px] h-[80px] w-[100px] bg-cover bg-center"
                        style={{ backgroundImage: `url(${downloadUrl})` }}
                      ></div>
                    )}
                  </div>
                );
              })}

            <div className={clsx("relative")}>
              <div onClick={() => setOpenEmoji((open) => !open)} ref={iconRef}>
                <SmileIcon className="h-4 fill-slate-500 cursor-pointer" />
              </div>
              {isOpenEmoji && (
                <div
                  className={clsx(
                    "absolute -top-[40px] left-1/2 -translate-x-1/2 w-[220px] bg-white p-2 rounded-md flex justify-between items-center shadow-lg"
                  )}
                  ref={iconRef}
                >
                  <Picker
                    data={iconData}
                    onEmojiSelect={async (e: any) => {
                      const sym = e.unified.split("-");
                      const codesArray: any[] = [];
                      sym.forEach((el: string) => codesArray.push("0x" + el));
                      const emoji = String.fromCodePoint(...codesArray);
                      await methods.handleReactionMessage({
                        iconId: emoji,
                        messageId: message.messageId,
                        conversationId: message.conversationId,
                      });
                      setOpenEmoji(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className={clsx(
              "flex items-center mt-2",
              message.self ? "right-0" : "left-0"
            )}
          >
            {message.reactions &&
              mappedReaction(message.reactions).map(
                (reaction: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="rounded-full py-1 px-2 bg-white border border-slate-300 flex items-center justify-between gap-1 w-12"
                    >
                      {/* <Emoji
                        key={index}
                        unified={reaction.iconId}
                        emojiStyle={EmojiStyle.FACEBOOK}
                        size={18}
                      /> */}
                      <span className="text-[14px]">{reaction.iconId}</span>
                      <span className="text-[10px] text-slate-500">
                        {reaction.users?.length}
                      </span>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
