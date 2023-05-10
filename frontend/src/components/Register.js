import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <section className='entrance' >
      <div className='entrance__container'>
        <h3 className='entrance__title'>Регистрация</h3>
        <form className='entrance__form' name='entrance-form-register' noValidate onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={handleChangeEmail}
            id='loggin-input'
            type='email'
            placeholder='Email'
            className='entrance__input'
            name='loggin'
            minLength='2'
            maxLength='40'
            required
          />

          <input
            value={password}
            onChange={handleChangePassword}
            id="password-input"
            type="password"
            placeholder="Пароль"
            className="entrance__input"
            name="password"
            minLength="4"
            maxLength="10"
            required
          />

          <button className='entrance__submit-btn' type="submit">Зарегистрироваться</button>
        </form>
        <Link to='/' className='entrance__link'>Уже зарегистрированы? Войти</Link>
      </div>
    </section>
  )
}

export default Register;