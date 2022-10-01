import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../utils/http-commons";
import { getToken } from "../../utils/JWT-token";

const initialState = {
  isLoading: true,
  data: "",
  error: null,
};

export const requestAiThunk = createAsyncThunk(
  "ai/requestAi",
  async (sound) => {
    try {
      const loginToken = getToken();
      const formdata = new FormData();
      formdata.append("file", sound);
      const response = await http.post(`/recipe/speech-to-text`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${loginToken}`,
        },
      });

      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    aiReqeustCacheClean: (state) => {
      state.data = "";
      state.isLoading = true;
    },
  },
  extraReducers: {
    [requestAiThunk.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [requestAiThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [requestAiThunk.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default aiSlice.reducer;
