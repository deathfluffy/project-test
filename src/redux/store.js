import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { advertsStateReducer } from "./adverts/adverts";
import { catalogReducer } from "./catalog/catalogSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    adverts: advertsStateReducer,
    catalog: catalogReducer,
  })
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
