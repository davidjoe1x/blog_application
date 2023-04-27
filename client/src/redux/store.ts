import { configureStore } from "@reduxjs/toolkit";
import { rootReduser } from "./combineRedusers";

export const store = configureStore({ reducer: rootReduser, devTools: true });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
