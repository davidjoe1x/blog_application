import { combineReducers } from "@reduxjs/toolkit";
import userReduser from "./User/userSlice";

const appReduser = combineReducers({
  user: userReduser,
});

export const rootReduser = (state: any, action: any) => {
  if (action.type === "USER_LOG_OUT") {
    return appReduser(undefined, action);
  }
  return appReduser(state, action);
};
