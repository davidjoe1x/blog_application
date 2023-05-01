import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";
import {
  AuthInitialState,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  UpdateUserRequest,
} from "./auth.interface";

const initialState: AuthInitialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null,
  isSignInLoading: false,
  isSignUpLoading: false,
  isUserUpdateLoading: false,
  signInError: null,
  signUpError: null,
  userUpdateError: null,
};

export const userSignIn = createAsyncThunk(
  "user/login",
  async (data: SignInRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<SignInResponse>("auth/login", data);
      return response.data;
    } catch (error: any) {
      const e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "user/register",
  async (data: SignUpRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<SignInResponse>("auth/register", data);
      return response.data;
    } catch (error: any) {
      const e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

export const userUpdate = createAsyncThunk(
  "user/update",
  async (data: UpdateUserRequest, { rejectWithValue }) => {
    try {
      const response = await axios.put(`users/${data.userId}`, data);
      console.log(response);
      return response.data;
    } catch (error: any) {
      const e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.pending, (state) => {
        state.isSignInLoading = true;
      })
      .addCase(
        userSignIn.fulfilled,
        (state, action: PayloadAction<SignInResponse>) => {
          state.isSignInLoading = false;
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )
      .addCase(userSignIn.rejected, (state, action) => {
        state.isSignInLoading = false;
        state.signInError = action.payload;
      })
      .addCase(userSignUp.pending, (state) => {
        state.isSignUpLoading = true;
      })
      .addCase(userSignUp.fulfilled, (state) => {
        state.isSignUpLoading = false;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.isSignUpLoading = false;
        state.signUpError = action.payload;
      })
      .addCase(userUpdate.pending, (state) => {
        state.isUserUpdateLoading = true;
      })
      .addCase(
        userUpdate.fulfilled,
        (state, action: PayloadAction<SignInResponse>) => {
          state.isUserUpdateLoading = false;
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )
      .addCase(userUpdate.rejected, (state, action) => {
        state.isUserUpdateLoading = false;
        state.signUpError = action.payload;
      });
  },
});

export const { logOutUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
