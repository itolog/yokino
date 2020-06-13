import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Helmet } from 'react-helmet';

import NavPanel from '../../components/NavPanel/NavPanel';
import { makeStyles } from '@material-ui/core/styles';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SnackbarUI from '../../shared/UI/Snackbar/Snackbar';

// store
import { Actions } from '../../state/user/actions';
import { isUserLogged } from '../../state/user/selectors';

import '../styles/_root.scss';
import { authTokenService } from '../services/authToken.service';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  title?: string | null;
  description?: string | null;
}

const useStyles = makeStyles(() => ({
  wrapperLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    margin: '0 auto',
    maxWidth: 1470,
    paddingTop: 0,
  },
}));

const Layout: React.FC<LayoutProps> = memo(
  ({ children, title = 'Yokino', description = 'Cinema Yokino, online' }) => {
    const dispatch = useDispatch();
    const isLogged = useSelector(isUserLogged);

    const classes = useStyles();

    useEffect(() => {
      const token$ = authTokenService.getAuthToken().subscribe(
        (data) => {
          if (data) {
            dispatch(Actions.loadUser());
          }
        },
      );
      return function cleanUp() {
        token$.unsubscribe();
      };
    }, [ isLogged ]);

    return (
      <>
        <Helmet title={title || ''}>
          <html lang='ru'/>
          <meta
            httpEquiv='Content-Security-Policy'
            content='upgrade-insecure-requests'
          />
          <meta name='description' content={description || ''}/>
          <meta name='keywords' content='Cinema, Yokino, Online'/>
        </Helmet>
        <Header/>
        <aside>
          <NavPanel/>
        </aside>
        <main className={classes.wrapperLayout}> {children}  </main>

        <SnackbarUI/>

        <Footer/>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <script
          src='https://partnercoll.github.io/actualize.js'
          async={true}
        />
        <script src='https://weblion777.github.io/hdvb_new.js' async={true}/>
      </>
    );
  },
);

export default Layout;