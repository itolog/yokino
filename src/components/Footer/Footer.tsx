import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Android from '../../assets/img/android.svg';

import Logo from '../../shared/UI/Logo/Logo';
import Mail from '../Mail/Mail';

const useStyles = makeStyles(() => ({
  footer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 5,
    height: '80px',
    boxShadow: '0px -4px 18px 0px rgba(92, 27, 92, 1)',
    flex: '0 0 auto',
    padding: '0 40px',
  },
  apkLink: {
    width: '50px',
    height: '50px',
    transition: '0.6s',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  footerApps: {
    flex: 1,
  },
  footerLogo: {
    flex: 1,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Logo classes={classes.footerLogo}/>

      <div className={classes.footerApps}>
        <a className={classes.apkLink} href='https://yokino-api.herokuapp.com/apk/app-release.apk' download={true}><Android/></a>
      </div>
      <Mail />
    </footer>
  );
};

export default Footer;