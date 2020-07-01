import React, { useState, memo } from 'react';

import useStyles from '../shared/styles/authPage';

import Login from '../components/Auth/Login/Login';
import Registration from '../components/Auth/Registration/Registration';
import Layout from '../shared/Layout/Layout';

const Auth = memo(() => {
  const classes = useStyles();
  const [ isLoginComponent, setIsLoginComponent ] = useState(true);
  const loginVisible = () => {
    setIsLoginComponent(true);
  };

  const registarationVisible = () => {
    setIsLoginComponent(false);
  };

  return (
    <Layout title='авторизация'>
      <main className={classes.authPage}>
        {isLoginComponent && <Login/>}
        {!isLoginComponent && <Registration/>}
        <div className={classes.authLogReg}>
          {isLoginComponent && <span onClick={registarationVisible}>зарегистрироваться</span>}
          {!isLoginComponent && <span onClick={loginVisible}>войти</span>}
        </div>
      </main>
    </Layout>
  );
});

export default Auth;