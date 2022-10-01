import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../utils/http-commons";
import { getToken } from "../../utils/JWT-token";

const initialState = {
  aiRequest: {
    isLoading: true,
    data: "",
    error: null,
  },
  aiReading: {
    contents: ["음성 안내 기능을 시작합니다."],
    currentCur: 0,
    content: "",
    preFlag: false,
    nextFlag: false,
    readEnd: false,
    nowPlaying: false,
  },
  aiListen: {
    nowListen: false,
    aiRequestData: "",
  },
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
    aiListenStartAction: (state) => {
      console.log("testg");
      state.aiListen.nowListen = true;
    },
    aiListenEndAction: (state) => {
      state.aiListen.nowListen = false;
    },
    aiReadingInit: (state, { payload }) => {
      state.aiReading.contents = [
        ...state.aiReading.contents,
        ...payload,
        "음성 안내가 끝났습니다.",
      ];
      const test = window.speechSynthesis;
      test.cancel();
      state.aiReading.content = state.aiReading.contents[0];
      state.aiReading.nowPlaying = !state.aiReading.nowPlaying;
    },
    aiReadEndAction: (state) => {
      if (state.aiReading.preFlag) {
        if (state.aiReading.currentCur > 0) {
          const tempCur = state.aiReading.currentCur;
          state.aiReading.currentCur -= 1;
          state.aiReading.content = state.aiReading.contents[tempCur - 1];
          if (!state.aiReading.nowPlaying) {
            state.aiReading.nowPlaying = !state.aiReading.nowPlaying;
          }
          state.aiReading.preFlag = false;
        }
      } else if (state.aiReading.nextFlag) {
        const tempCur = state.aiReading.currentCur;
        state.aiReading.currentCur += 1;
        state.aiReading.content = state.aiReading.contents[tempCur + 1];
        if (!state.aiReading.nowPlaying) {
          state.aiReading.nowPlaying = !state.aiReading.nowPlaying;
        }
      } else if (!state.aiReading.preFlag && !state.aiReading.nextFlag) {
        const tempCur = state.aiReading.currentCur;
        state.aiReading.currentCur += 1;
        state.aiReading.content = state.aiReading.contents[tempCur + 1];
      }
    },
    aiReadingNowPlaying: (state) => {
      state.aiReading.nowPlaying = !state.aiReading.nowPlaying;
    },
    aiReadingPushPreButton: (state) => {
      state.aiReading.preFlag = true;
    },
    aiReadingPushNextButton: (state) => {
      state.aiReading.nextFlag = true;
    },
    aiReqeustCacheClean: (state) => {
      state.aiRequest.data = "";
      state.aiRequest.isLoading = true;
    },
  },
  extraReducers: {
    [requestAiThunk.pending]: (state) => {
      state.aiRequest.isLoading = true;
      state.aiRequest.error = null;
    },
    [requestAiThunk.fulfilled]: (state, { payload }) => {
      state.aiRequest.isLoading = false;
      state.aiRequest.data = payload;
    },
    [requestAiThunk.rejected]: (state, { payload }) => {
      state.aiRequest.error = payload;
      state.aiRequest.isLoading = false;
    },
  },
});

export const {
  aiReadingInit,
  aiReadEndAction,
  aiReadingPushPreButton,
  aiReadingNowPlaying,
  aiReadingPushNextButton,
  aiListenStartAction,
  aiListenEndAction,
  aiReqeustCacheClean,
} = aiSlice.actions;

export default aiSlice.reducer;
