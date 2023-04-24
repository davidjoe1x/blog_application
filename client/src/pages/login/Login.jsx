import './login.scss';
import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { Context } from '../../components/context/Context';
import axios from 'axios';


export default function Login() {
const userRef = useRef();
const passwordRef = useRef();
const {dispatch, isFetching} = useContext(Context);




  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({type:'LOGIN_START'});
    try{
      const res = await axios.post('auth/login', {
      username: userRef.current.value,
      password: passwordRef.current.value,
    });

      dispatch({type:'LOGIN_SUCCESS', payload:res.data});
      
    } catch(err) {

      dispatch({type:'LOGIN_FAILURE'})
  }
}


  return (
 
    <div className='login'>
        <span className="loginTitle">
            Вход
        </span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Логин</label>
        <input type='text' className='loginInput' placeholder='Имя аккаунта' ref={userRef}></input>

        <label>Пароль</label>
        <input type='password'className='loginInput' placeholder='Пароль' ref={passwordRef}></input>

        <button disabled={isFetching}  type='submit' className="loginButton">
            Войти
        </button>
      </form>
      <button className="loginRegisterButton">
      <Link className='topLink' to='/register'> Регистрация </Link>
        </button>
    </div>
  )
}

