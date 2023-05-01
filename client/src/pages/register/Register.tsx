import { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux";
import { selectAuth, userSignUp } from "../../redux/features";

import "./register.scss";

interface RegisterFormState {
  username: string;
  password: string;
  email: string;
}

export const Register = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signUpError, isSignUpLoading } = useAppSelector(selectAuth);

  const [state, setState] = useState<RegisterFormState>({
    username: "",
    password: "",
    email: "",
  });

  const handleRedirect = (): void => navigate("/login");
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
    if (state.username && state.password && state.email) {
      dispatch(userSignUp(state));
      navigate("/login");
      console.log("Форма отправлена");
    } else {
      console.log("Пожалуйста, заполните все поля формы");
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Регистрация</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Логин</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Имя аккаунта"
          name="username"
          value={state.username}
          onChange={handleFormField}
        />
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Адрес электронной почты"
          name="email"
          value={state.email}
          onChange={handleFormField}
        />
        <label>Пароль</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Ваш пароль"
          name="password"
          value={state.password}
          onChange={handleFormField}
        />
        <button className="registerButton" disabled={isSignUpLoading}>
          Зарегистрироваться
        </button>
      </form>
      <button className="registerLoginButton" onClick={handleRedirect}>
        Вход
      </button>

      {signUpError && (
        <span className="error">Проверьте правильность данных</span>
      )}
    </div>
  );
};
