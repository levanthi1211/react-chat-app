import { FC } from "react";
import { ChatIcon } from "@/shared/components/icons";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectTheme } from "@/modules/settings/components/themes/themesSlice";

export const UserChatPlaceholder: FC = () => {
  const { backgroundPatternType } = useAppSelector(selectTheme);

  return (
    <div
      className="flex justify-center items-center grow flex-col h-full bg-slate-200 dark:bg-slate-800"
      style={{
        backgroundImage: `url(/assets/images/bg-pattern/pattern-0${backgroundPatternType}.png)`,
      }}
    >
      <div className="bg-primary/20 h-32 w-32 rounded-full flex justify-center items-center">
        <ChatIcon className="h-16 fill-primary" />
      </div>
      <div className="my-4 text-center">
        <span className="text-[#495057] text-[22px] font-bold">
          Welcome to Doot chat
        </span>
        <br />
        <p className="text-[#797c8c] text-[12px] pt-2">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. cum sociis natoque penatibus et
        </p>
      </div>
      <button className="rounded bg-primary text-white px-4 py-2">
        Get Started
      </button>
    </div>
  );
};
