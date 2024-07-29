import { createSlice } from "@reduxjs/toolkit";
import { fetchAdverts } from "../thunkApi/thunkApi";
import { addToFavorites, removeFromFavorites } from "../actions/actions";

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    favorites: [],
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
      })
      .addCase(addToFavorites, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFromFavorites, (state, action) => {
        state.favorites = state.favorites.filter(
          (advert) => advert._id !== action.payload
        );
      });    
  },
});

export const catalogReducer = catalogSlice.reducer;
