import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer from "./features/auth/auth.slice";
import postReducer from "./features/post/post.slice";
import postsReducer from "./features/posts/posts.slice";
import scrollbarReducer from "./features/scrollbar/scrollbar.slice";
import uploadReducer from "./features/upload/upload.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    posts: postsReducer,
    upload: uploadReducer,
    scrollbar: scrollbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
