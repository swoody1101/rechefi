import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./module/accountReducer";

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
