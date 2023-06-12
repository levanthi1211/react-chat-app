import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/infra/redux/store";

export type backgroundPattern = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface ThemeState {
  backgroundPatternType: backgroundPattern;
  darkMode: boolean;
  themeColor: string;
}

const initialState: ThemeState = {
  backgroundPatternType: 1,
  darkMode: false,
  themeColor: "#1fb6ff",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeBackground: (
      state,
      action: PayloadAction<{ backgroundPattern: backgroundPattern }>
    ) => {
      state.backgroundPatternType = action.payload.backgroundPattern;
    },

    changeThemeColor: (
      state,
      action: PayloadAction<{ themeColor: string }>
    ) => {
      state.themeColor = action.payload.themeColor;
    },
  },
});

export const { changeBackground, changeThemeColor } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
