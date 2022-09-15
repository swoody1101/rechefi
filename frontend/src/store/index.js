import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./Recipe/recipeReducer";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});

export default store;
