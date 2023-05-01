import { ReactElement, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import { PF } from "../../constans/pf";
import { useAppDispatch, useAppSelector } from "../../redux";
import { logOutUser, selectAuth } from "../../redux/features/auth/auth.slice";

import "./navbar.scss";

export const Navbar = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const navRef = useRef<HTMLDivElement | null>(null);

  const showNavbar = (): void => {
    navRef.current?.classList.toggle("responsive_nav");
  };

  const handleLogout = (): void => {
    dispatch(logOutUser());
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
};
