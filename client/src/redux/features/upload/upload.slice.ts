import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../index";
import { UploadInitialState } from "./upload.interface";

const initialState: UploadInitialState = {
  isFetching: false,
  error: null,
};

export const uploadImage = createAsyncThunk(
  "upload/image",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/upload", data);
      console.log(response);
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(uploadImage.rejected, (state, action: PayloadAction<any>) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export const selectUpload = (state: RootState) => state.upload;

export default uploadSlice.reducer;
