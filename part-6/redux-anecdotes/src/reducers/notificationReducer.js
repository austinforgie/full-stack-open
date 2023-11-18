import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    show(_, action) {
      return action.payload.message;
    },
    clear() {
      return initialState;
    },
  },
});

export default notificationSlice.reducer;
