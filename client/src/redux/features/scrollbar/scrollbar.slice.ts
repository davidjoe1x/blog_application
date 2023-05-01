import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../index";
import {
  ScrollbarInitialState,
  ScrollbarResponse,
} from "./scrollbar.interface";

const initialState: ScrollbarInitialState = {
  list: [],
  isFetching: false,
  error: null,
};

export const getScrollbarList = createAsyncThunk(
  "scrollbar/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ScrollbarResponse>(
        "https://63e4b4cb4474903105efeb33.mockapi.io/pint/blog-swiper"
      );
      return response.data;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

const scrollbarSlice = createSlice({
  name: "scrollbar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScrollbarList.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        getScrollbarList.fulfilled,
        (state, action: PayloadAction<ScrollbarResponse>) => {
          state.list = action.payload;
          state.isFetching = false;
        }
      )
      .addCase(
        getScrollbarList.rejected,
        (state, action: PayloadAction<any>) => {
          state.isFetching = false;
          state.error = action.payload;
        }
      );
  },
});

export const selectScrollbar = (state: RootState) => state.scrollbar;

export default scrollbarSlice.reducer;
