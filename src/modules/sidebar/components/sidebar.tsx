import { FC } from "react";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectMenu } from "@/modules/menu/redux/menuSlice";
import { Contact } from "./contact/contact";
import { Messages } from "./messages/messages";
import { Profile } from "./profile/profile";
import { Settings } from "../../settings/setting";

export const Sidebar: FC = () => {
  const sidebarState = useAppSelector(selectMenu);

  const { activeMenu } = sidebarState;

  return (
    <div className="w-[300px] h-full bg-white">
      {activeMenu === "PROFILE" && <Profile />}
      {activeMenu === "MESSAGES" && <Messages />}
      {activeMenu === "CONTACT" && <Contact />}
      {activeMenu === "SETTING" && <Settings />}
    </div>
  );
};
