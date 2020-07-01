import React, { useState, memo, Suspense } from 'react';

import useStyles from '../shared/styles/authPage';

const Login = React.lazy(() => import('../components/Auth/Login/Login'));
const Registration = React.lazy(() => import('../components/Auth/Registration/Registration'));
import AuthLoader from '../shared/UI/AuthLoader/AuthLoader';
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
        {isLoginComponent && <Suspense fallback={<AuthLoader/>}>
          <Login/>
        </Suspense>}
        {!isLoginComponent && <Suspense fallback={<AuthLoader/>}>
          <Registration/>
        </Suspense>}
        <div className={classes.authLogReg}>
          {isLoginComponent && <span onClick={registarationVisible}>зарегистрироваться</span>}
          {!isLoginComponent && <span onClick={loginVisible}>войти</span>}
        </div>
      </main>
    </Layout>
  );
});

export default Auth;
