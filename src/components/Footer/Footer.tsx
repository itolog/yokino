import React from 'react';
import Android from '../../assets/img/android.svg';

import './footer.scss';

import Logo from '../../shared/UI/Logo/Logo';

const Footer = () => {

  return (
    <footer className='footer'>
      <Logo classes='footer-logo'/>

      <div className='footer-apps'>
        <a className='apk-link' href='https://yokino-api.herokuapp.com/apk/app-release.apk' download={true}><Android/></a>
      </div>
    </footer>
  );
};

export default Footer;