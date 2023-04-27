import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import http from "../../axios/axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();

    try {
      const res = await http.post("/auth/register", {
        username,
        email,
        password,
      });

      res.data && navigate('/login')
    } catch (err) {
      setError(true);
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
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Адрес электронной почты"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label>Пароль</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Ваш пароль"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button className="registerButton">Зарегистрироваться</button>
      </form>
      <button type="submit" className="registerLoginButton">
        <Link className="topLink" to="/login">
          {" "}
          Вход{" "}
        </Link>
      </button>

      {error && <span className="error">Проверьте правильность данных</span>}
    </div>
  );
}
