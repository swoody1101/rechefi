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
  userId: "",
  email: "",
  nickname: "",
  introduce: "",
  follower: "",
  following: "",
  imgUrl: "",
  admin: "",
  followingList: [],
};

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (signupInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/members",
        signupInfo,
        { headers: { "Content-Type": `application/json` } }
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const signoutThunk = createAsyncThunk("auth/signout", async () => {
  try {
    const response = await http.delete("http://localhost:8000/members");
    return response.data;
  } catch (error) {
    return error.response;
  }
});

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const loginInfo = new FormData();
      loginInfo.append("username", email);
      loginInfo.append("password", password);

      const responseTemp = await axios.post(
        "http://localhost:8000/members/login/1",
        loginInfo
      );
      const response = {
        data: responseTemp.data,
        status: responseTemp.status,
      };

      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const loadMyProfileThunk = createAsyncThunk(
  "auth/loadMyProfileThunk",
  async () => {
    try {
      const response = await http.get("/members");
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const loadProfileThunk = createAsyncThunk(
  "auth/loadProfileThunk",
  async (email) => {
    try {
      const response = await http.get(`/members/${email}`);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const checkNicknameThunk = createAsyncThunk(
  "auth/checkNicknameThunk",
  async (nickname) => {
    try {
      const response = await http.get(`/members/validation/2/${nickname}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const porfileModifyThunk = createAsyncThunk(
  "auth/porfileModifyThunk",
  async (profileInfo) => {
    try {
      const response = await http.put("/members", profileInfo);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const loadFollowerListThunk = createAsyncThunk(
  "auth/loadFollowerListThunk",
  async (email) => {
    try {
      const response = await http.get(`/members/follower/${email}`);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const loadFollowingListThunk = createAsyncThunk(
  "auth/loadFollowingListThunk",
  async (email) => {
    try {
      const response = await http.get(`/members/following/${email}`);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
);
export const profileFollowThunk = createAsyncThunk(
  "auth/profileFollowThunk",
  async (email) => {
    try {
      const response = await http.post(`/members/follow/${email}`);
      return response.data;
    } catch (error) {
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
      state.nickname = "";
      state.introduce = "";
      state.imgUrl = "";
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

      if (payload.data.access_token) {
        state.auth = true;

        // data recieved
        state.loginToken = payload.data.access_token;
        state.userId = payload.data.user_id;
        state.email = payload.data.email;
        state.nickname = payload.data.nickname;
        state.admin = payload.data.is_admin;

        // save in local storage
        saveToken(state.loginToken);
      }
    },
    [loginThunk.pending]: (state) => {
      // loading
      state.loading = true;
      state.error = null;
    },
    [loadMyProfileThunk.fulfilled]: (state, { payload }) => {
      // loading
      state.loading = false;
      state.auth = true;

      state.email = payload.email;
      state.nickname = payload.nickname;
      state.imgUrl = payload.img_url;
      state.introduce = payload.about_me;
      state.follower = payload.follower;
      state.following = payload.following;
    },
    [loadFollowingListThunk.fulfilled]: (state, { payload }) => {
      // loading
      state.loading = false;
      state.auth = true;

      state.followingList = payload.following;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
