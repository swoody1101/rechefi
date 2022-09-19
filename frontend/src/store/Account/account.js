import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "../../utils/http-commons";

const initialState = {
  loading: false,
  error: null,
  success: false,
  username: "",
  password: "",
  nickname: "",
  auth: false,
};

export const loginThunk = createAsyncThunk(
  "login/loginThunks",
  async (loginInfo) => {
    try {
      console.log("요청");
      const response = await http.post("/members/test", loginInfo);
      console.log("response: " + response);
      const token = response.headers["access_token"];
      console.log("성공2");
      console.log(token);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.auth = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginThunk.fulfilled]: (state) => {
      state.loading = false;
      state.auth = true;
    },
    [loginThunk.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
