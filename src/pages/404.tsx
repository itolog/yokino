import React from 'react';
import Layout from '../shared/Layout/Layout';

const NotFoundPage = () => {
  return (
    <Layout title='404' description='not found.404'>
      <div className='not-found'>
        <h1>404 NOT FOUND</h1>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
