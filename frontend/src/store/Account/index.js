import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginReducer from "./account";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
