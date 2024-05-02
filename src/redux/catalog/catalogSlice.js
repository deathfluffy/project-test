import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adverts: [],
};

export const catalogSlice = createSlice({
  name: "adverts",
  initialState,
});
export const catalogReducer = catalogSlice.reducer;
