import { SendMessageServiceReq, sendMessageService } from "./chat.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/infra/redux/store";

interface UserChatState {
  currentConversation: string | undefined;
}

const initialState: UserChatState = {
  currentConversation: undefined,
};

export const sendMessageAction = createAsyncThunk(
  "userChat/sendMessage",
  async (req: SendMessageServiceReq, { rejectWithValue }) => {
    try {
      const data = await sendMessageService(req);
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentConversation: (
      state,
      action: PayloadAction<{ conversation: string }>
    ) => {
      state.currentConversation = action.payload.conversation;
    },
  },
});

export const { setCurrentConversation } = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export default chatSlice.reducer;
