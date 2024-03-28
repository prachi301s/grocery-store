import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "axios";

// Get user from localStorage
const user = localStorage.getItem('user');

const URL = import.meta.env.VITE_REACT_AUTH_URL;
//console.log("token",data?.data?.token)
//console.log(signupURl+"signup")
const initialState = {
  user: user ? user : null,
  token: " ",
  isLoading: false,
  message: "",
  isError: false,
  isSuccess: false,
}
//Register user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  try {
    const response = await axios.post(URL+"signup", user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log("res", response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }}
);


// log in
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await authService.login(user, config);
    if (response.data) {
      //  localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data?.data?.accessToken));
      console.log("resToken", response.data?.data?.token);
      console.log("login", response.data);
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// log out
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reset function to reset state default values
    reset: (state) => {
      state.isLoading = false;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false,
          state.isSuccess = true,
          state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false,
          state.isError = true,
          state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
