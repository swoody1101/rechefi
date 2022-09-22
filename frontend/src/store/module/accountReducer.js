import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { getToken, saveToken } from "../../utils/JWT-token";

const initialState = {
  // connection flags
  loading: false,
  error: null,
  success: false,
  auth: false,

  // user data
  loginToken: getToken(),
  email: "",
  nickname: "",
};

export const signupThunk = createAsyncThunk(
  "signup/signupThunks",
  async (signupInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/members/signup",
        signupInfo,
        { headers: { "Content-Type": `application/json` } }
      );

      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  }
);

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

      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = "";
      state.auth = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state) => {
      // loading
      state.loading = true;
      state.error = null;
    },
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.auth = true;

      // data recieved
      state.loginToken = payload.access_token;
      state.email = payload.email;
      state.nickname = payload.nickname;

      // save in local storage
      saveToken(state.loginToken);
    },
    [loginThunk.rejected]: (state, { payload }) => {
      // error
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
