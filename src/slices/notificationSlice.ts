import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  title: string;
  description: string;
  createdAt: string;
  seen: boolean;
}

interface NotificationState {
  messages: Message[];
  hasNewMessage: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  messages: [],
  hasNewMessage: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "sse",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...action.payload, ...state.messages];
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setRedDotNotification: (state) => {
      state.hasNewMessage = true;
    },
    clearRedDotNotification: (state) => {
      state.messages = state.messages.map((message) => ({ ...message, seen: true }));
      state.hasNewMessage = false;
    },
  },
});

export const {
  addMessage,
  setError,
  clearMessages,
  setRedDotNotification,
  clearRedDotNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
