import logo from "./../images/logo.svg"

import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";

function Header({ email, onSignOut }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClickMenu() {
    setIsClicked(!isClicked)
  }

  return (

    <header className="header">
      <div className={`header__box ${isClicked ? 'header__box_small-menu' : ''}`}>
        <img className={`header__logo ${isClicked ? 'header__logo_small-menu' : ''}`} src={logo} alt="Логотип Место" />
        <Routes>
          <Route path="/sign-up" element={
            <Link to={"/sign-in"} className="header__link">Войти</Link>} />
          <Route path="/sign-in" element={
            <Link to={"/sign-up"} className="header__link">Регистрация</Link>} />
          <Route exact path="/" element={
            <>
              <div className={`header__menu-btn ${isClicked ? 'header__menu-btn_close' : ''}`} onClick={handleClickMenu}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={`header__user-box ${isClicked ? 'header__user-box_small-menu' : ''}`}>
                <p className='header__email'>{email}</p>
                <button
                  onClick={onSignOut}
                  className='header__link header__button'>Выйти</button>
              </div>
            </>} />
        </Routes>
      </div>
    </header>
    
  )
}
export default Header;