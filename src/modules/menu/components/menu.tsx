import { FC, useState } from "react";
import { changeActiveMenu, menuType, selectMenu } from "../redux/menuSlice";
import { useAppDispatch, useAppSelector } from "@/shared/infra/redux/hooks";
import {
  BookmarkIcon,
  CallIcon,
  ChatIcon,
  ContactIcon,
  DarkModeIcon,
  LightModeIcon,
  MessagesIcon,
  ProfileIcon,
  SettingIcon,
} from "@/shared/components/icons";
import clsx from "clsx";
import { logoutService } from "@/modules/login/service/login.service";

export const Menu: FC = () => {
  const sidebarState = useAppSelector(selectMenu);

  const { activeMenu } = sidebarState;
  const dispatch = useAppDispatch();

  const handleChangeMenu = (menuType: menuType) => {
    dispatch(changeActiveMenu({ menuType }));
  };

  const handleLogout = async () => {
    await logoutService();
  };

  const RenderThemeChanger: FC = () => {
    const currentTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState<string | null>(currentTheme);

    if (theme === "dark") {
      return (
        <div
          className="py-6 cursor-pointer"
          onClick={() => {
            setTheme("light");
            localStorage.setItem("theme", "light");
          }}
        >
          <LightModeIcon className="h-6 fill-yellow-500" />
        </div>
      );
    } else {
      return (
        <div
          className="py-6 cursor-pointer"
          onClick={() => {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
          }}
        >
          <DarkModeIcon className="h-6 fill-gray-600" />
        </div>
      );
    }
  };
  return (
    <div className="text-white w-20 bg-[#2e2e2e] dark:bg-[#d1d1d1] h-full flex py-4 flex-col items-center justify-between">
      <div className="">
        <div className="pb-8">
          <ChatIcon className="h-7 fill-primary" />
        </div>
        <div className="flex flex-col items-center">
          <div
            className="py-6 cursor-pointer"
            onClick={() => handleChangeMenu("PROFILE")}
          >
            <ProfileIcon
              className={clsx("h-6", [
                activeMenu === "PROFILE" ? "fill-primary" : "fill-[#878a92]",
              ])}
            />
          </div>
          <div
            className="py-6 cursor-pointer"
            onClick={() => handleChangeMenu("MESSAGES")}
          >
            <MessagesIcon
              className={clsx("h-6", [
                activeMenu === "MESSAGES" ? "fill-primary" : "fill-[#878a92]",
              ])}
            />
          </div>
          <div
            className="py-6 cursor-pointer"
            onClick={() => handleChangeMenu("CONTACT")}
          >
            <ContactIcon
              className={clsx("h-6", [
                activeMenu === "CONTACT" ? "fill-primary" : "fill-[#878a92]",
              ])}
            />
          </div>
          <div
            className="py-6 cursor-pointer"
            onClick={() => handleChangeMenu("BOOKMARK")}
          >
            <BookmarkIcon
              className={clsx("h-6", [
                activeMenu === "BOOKMARK" ? "fill-primary" : "fill-[#878a92]",
              ])}
            />
          </div>
          <div
            className="py-6 cursor-pointer"
            onClick={() => handleChangeMenu("SETTING")}
          >
            <SettingIcon
              className={clsx("h-6", [
                activeMenu === "SETTING" ? "fill-primary" : "fill-[#878a92]",
              ])}
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-center">
          <RenderThemeChanger />
          <div
            className="mt-4 h-8 w-8 rounded-full bg-white"
            onClick={handleLogout}
          ></div>
        </div>
      </div>
    </div>
  );
};
