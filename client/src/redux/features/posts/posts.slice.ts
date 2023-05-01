import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../index";
import { PostsInitialState, PostsResponse } from "./posts.interface";

const initialState: PostsInitialState = {
  posts: [],
  isFetching: false,
  error: null,
};

export const getPosts = createAsyncThunk(
  "posts/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<PostsResponse>("/posts");
      return response.data;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        getPosts.fulfilled,
        (state, action: PayloadAction<PostsResponse>) => {
          state.posts = action.payload;
          state.isFetching = false;
        }
      )
      .addCase(getPosts.rejected, (state, action: PayloadAction<any>) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export const { setPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
