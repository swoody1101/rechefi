import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    email: "",
    password: "",
    nickname: "",
  },
  data: "",
};

export const searchPasswordFetch = createAsyncThunk(
  "members/new-password/",
    async (email, { rejectWithValue }) => {
        try {
          const response = await axios.get("members/email/{}")
      }
  }
);
