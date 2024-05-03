import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { catalogReducer } from "./adverts/adverts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["catalog"],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
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
