import React from 'react';

import '../shared/styles/authPage.scss';

import Layout from '../shared/components/Layout/Layout';
import Login from '../shared/components/Login/Login';

const Auth = () => {
  return (
    <Layout title='авторизация'>
      <main className='auth-page'>
        <Login />
      </main>
    </Layout>
  );
};

export default Auth;
