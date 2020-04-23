/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions,
jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import '../shared/styles/authPage.scss';

import Layout from '../shared/Layout/Layout';
import Login from '../shared/components/Login/Login';
import Registration from '../shared/components/Registration/Registration';


const Auth = () => {
  const [ isLoginComponent, setIsLoginComponent ] = useState(true);
  const loginVisible = () => {
    setIsLoginComponent(true);
  };

  const registarationVisible = () => {
    setIsLoginComponent(false);
  };

  return (
    <Layout title='авторизация'>
      <main className='auth-page'>
        {isLoginComponent && <Login/>}
        {!isLoginComponent && <Registration/>}
        <div className='auth-log-reg'>
          {isLoginComponent && <span onClick={registarationVisible}>зарегистрироваться</span>}
          {!isLoginComponent && <span onClick={loginVisible}>войти</span>}
        </div>
      </main>
    </Layout>
  );
};

export default Auth;
