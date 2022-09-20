import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";
import { getToken, saveToken } from "../../utils/JWT-token";

const initialState = {
  // connection flags
  loading: false,
  error: null,
  success: false,

  // user data
  loginToken: getToken(),
  email: "",
  nickname: "",
  num: "",
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

      // TODO : more data is needed from server (userId, userNum, userNickname...)
      // TODO : JWT token disassembled
      return {
        loginToken: response.data["access_token"],
        userId: "",
        userNickname: "",
        userNum: "",
      };
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
      state.username = "";
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
      state.loginToken = payload.loginToken;
      state.email = payload.userId;
      state.nickname = payload.userNickname;
      state.num = payload.userNum;

      // save in local storage
      saveToken(payload.loginToken);
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
