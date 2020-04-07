import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header/Header';

import './layout.scss';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  title?: string | null;
  description?: string | null;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Yokino',
  description = 'Cinema Yokino',
}) => {
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
      </Helmet>
      <Header />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 1470,
          paddingTop: 0,
        }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
