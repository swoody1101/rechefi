import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveToken, deleteToken } from "../../api/JWToken";
import { OK, CUSTOMER, CONSULTANT } from "../../api/CustomConst";


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
