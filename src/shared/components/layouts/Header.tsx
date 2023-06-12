import { FC } from "react";
import { ChatIcon } from "../icons";

export const Header: FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-start items-center">
        <ChatIcon fill="white" className="h-8 mr-6" />
        <h1 className="text-white text-xl font-bold">Moot Chat</h1>
      </div>
      <div className="mt-4">
        <p className="text-white text-base font-ligh opacity-50">
          Chat app (ReactJS + TailwindCSS + Redux + Firebase)
        </p>
      </div>
    </div>
  );
};
