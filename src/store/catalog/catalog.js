import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  price: null,
  location: "Ukraine, Kyiv",
  adults: null,
  children: null,
  engine: null,
  transmission: null,
};

export const catalogSlice = createSlice({
  name: "products",
  initialState,
});
export const catalogReducer = catalogSlice.reducer;
