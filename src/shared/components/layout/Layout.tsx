import React from 'react';
import Helmet from 'react-helmet';
import Header from '../../../components/Header/Header';

import './layout.scss';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Yokino',
  description = 'Cinema Yokino',
}) => {
  return (
    <>
      <Helmet
        title={title}
        meta={[
          {
            name: 'description',
            content: `${description}`,
          },
          { name: 'keywords', content: 'Cinema, Yokino, Online' },
        ]}
      >
        <html lang='ru' />
        <meta
          http-equiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
      </Helmet>
      <Header />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 1170,
          paddingTop: 0,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
