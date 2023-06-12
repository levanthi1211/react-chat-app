import chatSlice from "@/modules/chat/chatSlice";
import menuSlice from "@/modules/menu/redux/menuSlice";
import applicationsSlice from "@/modules/sidebar/components/contact/applications/applicationsSlice";
import contactSlice from "@/modules/sidebar/components/contact/contactSlice";
import profileSlice from "@/modules/sidebar/components/profile/profileSlice";
import themeSlice from "@/modules/settings/components/themes/themesSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const reducer = combineReducers({
  menu: menuSlice,
  profile: profileSlice,
  theme: themeSlice,
  contact: contactSlice,
  applications: applicationsSlice,
  chat: chatSlice,
});
