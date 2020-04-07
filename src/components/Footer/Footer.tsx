import React from 'react';
import Android from '../../assets/img/android.svg';

import './footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <a className='apk-link' href='https://yokino-api.herokuapp.com//apk/app-release.apk' download={true}><Android/></a>
    </footer>
  );
};

export default Footer;