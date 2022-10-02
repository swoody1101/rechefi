import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../utils/http-commons";

const intialState = {};

export const recipeSlice = createSlice({
  name: "recipe",
  intialState,
  reducers: {},
  extraReducers: {},
});

export const loadRecipeThunk = createAsyncThunk(
  "recipe/loadRecipeThunk",
  async (param) => {
    try {
      const response = await http.get(`/recipe/${param.page}?mid=${param.mid}`);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const loadMyCookThunk = createAsyncThunk(
  "recipe/loadMyCookListThunk",
  async (param) => {
    try {
      const response = await http.get(
        `/community/gallery/search-by-id/${param.page}?mid=${param.mid}`
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export default recipeSlice.reducer;
