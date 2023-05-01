import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../index";
import { setPosts } from "../posts/posts.slice";
import {
  CreatePostRequest,
  PostInitialState,
  PostResponse,
  UpdatePostRequest,
} from "./post.interface";

const initialState: PostInitialState = {
  post: null,
  isFetching: false,
  error: null,
};

export const getPost = createAsyncThunk(
  "post/get",
  async (id: string, { rejectWithValue, getState }) => {
    const { posts } = (getState() as RootState).posts;
    const post = posts.find((p) => p._id === id);
    if (post) return post;
    try {
      const response = await axios.get<PostResponse>(`/posts/${id}`);
      return response.data;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (data: CreatePostRequest, { rejectWithValue, getState, dispatch }) => {
    const { user } = (getState() as RootState).auth;
    try {
      const response = await axios.post<PostResponse>("/posts", {
        username: user?.username,
        ...data,
      });
      return response.data;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/update",
  async (
    { id, title, desc }: UpdatePostRequest,
    { rejectWithValue, getState, dispatch }
  ) => {
    const { user } = (getState() as RootState).auth;
    try {
      const response = await axios.put<PostResponse>(`/posts/${id}`, {
        username: user?.username,
        title,
        desc,
      });
      return response.data;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/delete",
  async (id: string, { rejectWithValue, getState, dispatch }) => {
    const user = (getState() as RootState).auth.user;
    try {
      await axios.delete(`/posts/${id}`, {
        data: { username: user?.username },
      });

      dispatch(setPosts(id));
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        createPost.fulfilled,
        (state, action: PayloadAction<PostResponse>) => {
          state.post = action.payload;
          state.isFetching = false;
        }
      )
      .addCase(createPost.rejected, (state, action: PayloadAction<any>) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        getPost.fulfilled,
        (state, action: PayloadAction<PostResponse>) => {
          state.post = action.payload;
          state.isFetching = false;
        }
      )
      .addCase(getPost.rejected, (state, action: PayloadAction<any>) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        updatePost.fulfilled,
        (state, action: PayloadAction<PostResponse>) => {
          state.post = action.payload;
          state.isFetching = false;
        }
      )
      .addCase(updatePost.rejected, (state, action: PayloadAction<any>) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.post = null;
        state.isFetching = false;
      })
      .addCase(deletePost.rejected, (state, action: PayloadAction<any>) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export const selectPost = (state: RootState) => state.post;

export default postSlice.reducer;
