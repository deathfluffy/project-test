import { createSlice } from "@reduxjs/toolkit";
import { fetchAdverts } from "../actions/actions.js";

export const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    adverts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdverts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adverts = action.payload;
      })
      .addCase(fetchAdverts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAdverts = (state) => state.adverts.adverts;

export const advertsStateReducer = advertsSlice.reducer;
