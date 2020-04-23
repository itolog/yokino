import React, { memo } from 'react';

import { Helmet } from 'react-helmet';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import './layout.scss';

import NavBar from '../../components/NavBar/NavBar';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  title?: string | null;
  description?: string | null;
}

const Layout: React.FC<LayoutProps> = memo(
  ({ children, title = 'Yokino', description = 'Cinema Yokino, online' }) => {
    return (
      <>
        <Helmet title={title || ''}>
          <html lang='ru' />
          <meta
            httpEquiv='Content-Security-Policy'
            content='upgrade-insecure-requests'
          />
          <meta name='description' content={description || ''} />
          <meta name='keywords' content='Cinema, Yokino, Online' />

          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />

          <script
            src='https://partnercoll.github.io/actualize.js'
            async={true}
          />
          <script src='https://weblion777.github.io/hdvb_new.js' async={true} />
        </Helmet>
        <Header />
        <div
          className='wrapper-layout'
          style={{
            margin: '0 auto',
            maxWidth: 1470,
            paddingTop: 0,
          }}>
          <NavBar />
          {children}
          <Footer />
        </div>
      </>
    );
  },
);

export default Layout;
