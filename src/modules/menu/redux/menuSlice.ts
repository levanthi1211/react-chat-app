import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/infra/redux/store";

export type menuType =
  | "PROFILE"
  | "MESSAGES"
  | "CALL"
  | "BOOKMARK"
  | "CONTACT"
  | "SETTING";

interface MenuState {
  activeMenu: menuType;
}

const initialState: MenuState = {
  activeMenu: "PROFILE",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeActiveMenu: (
      state,
      action: PayloadAction<{ menuType: menuType }>
    ) => {
      state.activeMenu = action.payload.menuType;
    },
  },
});

export const { changeActiveMenu } = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu;

export default menuSlice.reducer;
