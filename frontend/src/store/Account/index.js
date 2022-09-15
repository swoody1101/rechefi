import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./account";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
