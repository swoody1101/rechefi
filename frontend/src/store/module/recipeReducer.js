import { createSlice } from "@reduxjs/toolkit/dist/createSlice";

const intialState = {};

export const recipeSlice = createSlice({
  name: "recipe",
  intialState,
  reducers: {},
  extraReducers: {},
});

export const loadRecipeById = createAsyncThunk(
  "recipe/loadRecipeById",
  async (page) => {
    try {
      const response = await http.get(`/recipe/${page}`);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
);

export default recipeSlice.reducer;
