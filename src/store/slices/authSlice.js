import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USERS_URL = import.meta.env.VITE_API_USERS;
const AUTH_URL = import.meta.env.VITE_API_AUTH;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post(`${USERS_URL}/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: Number(formData.age),
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post(`${AUTH_URL}/login`, formData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )

      .addMatcher(
        (action) => action.type === "auth/loginUser/fulfilled",
        (state, action) => {
          state.status = "succeeded";
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addMatcher(
        (action) => action.type === "auth/registerUser/fulfilled",
        (state) => {
          state.status = "succeeded";
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
