import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { getToken, saveToken } from "../../utils/JWT-token";

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
  async ({ email, password }) => {
    try {
      const loginInfo = new FormData();
      loginInfo.append("username", email);
      loginInfo.append("password", password);

      const response = await axios.post(
        "http://localhost:8000/members/login/1",
        loginInfo
      );

      const token = response.data["access_token"];

      saveToken(token);
      console.log("getToken: " + getToken());

      return;
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
