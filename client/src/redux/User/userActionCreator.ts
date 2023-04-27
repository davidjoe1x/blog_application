import http from "../../axios/axios";
import { AppDispatch } from "../store";
import { setError, setLoading, setUser, User } from "./userSlice";

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      const response = await http.post<User>(`/auth/signin`, {
        email,
        password,
      });
      dispatch(setUser(response.data));
    } catch (error: any) {
      if (error.response) {
        // Запрос был отправлен, но сервер ответил кодом, который не находится в диапазоне 2xx
        dispatch(setError(error.response.data.message));
      } else if (error.request) {
        // Запрос был отправлен, но не получен ответ
        dispatch(setError("No response received"));
      } else {
        // Произошла ошибка при настройке запроса
        dispatch(setError(error.message));
      }
    }
  };
