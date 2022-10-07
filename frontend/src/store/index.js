import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./module/accountReducer";
import AiReducer from "./module/AiReducer";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    aiReducer:AiReducer
  },
});
