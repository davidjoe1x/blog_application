import { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux";
import { selectAuth, userSignIn } from "../../redux/features";

import "./login.scss";

interface LoginFormState {
  username: string;
  password: string;
}

export const Login = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSignInLoading } = useAppSelector(selectAuth);

  const [state, setState] = useState<LoginFormState>({
    username: "",
    password: "",
  });

  const handleRedirect = (): void => navigate("/register");
  const handleFormField = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setState((prevState) => ({ ...prevState, [fieldName]: fieldValue }));
    },
    [setState]
  );
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (state.username && state.password) {
      dispatch(userSignIn(state));
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Вход</span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Логин</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Имя аккаунта"
          name="username"
          value={state.username}
          onChange={handleFormField}
        />
        <label>Пароль</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Пароль"
          name="password"
          value={state.password}
          onChange={handleFormField}
        />

        <button disabled={isSignInLoading} className="loginButton">
          Войти
        </button>
      </form>
      <button className="loginRegisterButton" onClick={handleRedirect}>
        Регистрация
      </button>
    </div>
  );
};
