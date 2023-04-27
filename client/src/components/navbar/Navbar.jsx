import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../components/context/Context";

export default function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:3001/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <Link className="logo topLink" to="/">
        <h3>Daimler </h3>
      </Link>

      <nav ref={navRef}>
        <Link onClick={showNavbar} className="menuLink " to="/">
          Домой
        </Link>
        <Link onClick={showNavbar} className="menuLink " to="/">
          Контакты
        </Link>

        <Link
          onClick={showNavbar}
          className="menuLink "
          to="https://www.mbzla.com/"
        >
          Дилер
        </Link>

        <Link onClick={showNavbar} className="menuLink " to="/write">
          Новый пост
        </Link>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>

      <div className="burger">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="topLink " to="/login">
                Войти
              </Link>
            </li>
            <li className="topListItem">
              <Link className="topLink " to="/register">
                Регистрация
              </Link>
            </li>
          </ul>
        )}

        <li className="topListItem" onClick={handleLogout}>
          {user && "ВЫХОД"}
        </li>

        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
    </div>
  );
}
