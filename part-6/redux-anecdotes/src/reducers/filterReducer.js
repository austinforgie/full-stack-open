import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    update(_, action) {
      return action.payload.query;
    },
  },
});

export default filterSlice.reducer;
