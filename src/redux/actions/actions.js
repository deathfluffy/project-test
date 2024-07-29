import { createAction } from "@reduxjs/toolkit";

export const addToFavorites = createAction("ADD_FAVORITE");
export const removeFromFavorites = createAction("REMOVE_FAVORITE");
