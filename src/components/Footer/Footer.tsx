import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Android from '../../assets/img/android.svg';

import './footer.scss';

const Footer = () => {
  const data = useStaticQuery(graphql`
      query {
          file(relativePath: { eq: "icon-512x512.png" }) {
              childImageSharp {
                  fixed(width: 40, height: 40, quality: 90) {
                      ...GatsbyImageSharpFixed
                  }
              }
          }
      }
  `);

  return (
    <footer className='footer'>
      <div className='footer-logo'>
        <Link to='/'>
          <Img
            fixed={data.file.childImageSharp.fixed}
            alt='yokino logo'
          />
        </Link>
      </div>
      <div className='footer-apps'>
        <a className='apk-link' href='https://yokino-api.herokuapp.com/apk/app-release.apk' download={true}><Android/></a>
      </div>
    </footer>
  );
};

export default Footer;