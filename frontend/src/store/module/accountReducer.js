import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import http from "../../utils/http-commons";
import { deleteToken, getToken, saveToken } from "../../utils/JWT-token";

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
  introduce: "",
  img_url: "",
  data: "",
};

export const signupThunk = createAsyncThunk(
  "auth/signup",
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
  "auth/login",
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

export const loadProfileThunk = createAsyncThunk(
  "auth/loadProfileThunk",
  async () => {
    try {
      const response = await http.get("/members");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  }
);

export const checkNicknameThunk = createAsyncThunk(
  "auth/checkNicknameThunk",
  async (nickname) => {
    try {
      const response = await http.get(`/members/validation/2/${nickname}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  }
);

export const porfileModifyThunk = createAsyncThunk(
  "auth/porfileModifyThunk",
  async (profileInfo) => {
    try {
      const response = await http.put("/members", profileInfo);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = "";
      state.auth = false;
      state.loading = false;
      state.error = null;
      deleteToken();
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
    [loadProfileThunk.pending]: (state) => {
      // loading
      state.loading = true;
      state.error = null;
    },
    [loadProfileThunk.fulfilled]: (state, { payload }) => {
      // loading
      state.loading = false;
      state.nickname = payload.nickname;
      state.img_url = payload.img_url;
      state.introduce = payload.about_me;
      console.log(state.nickname);
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
