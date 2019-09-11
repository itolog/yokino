import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React, { useState } from 'react';
import Menu from '../../assets/img/menu.svg';
import Search from '../../shared/components/Search/Search';
import NavBar from '../NavBar/NavBar';

import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon-512x512.png" }) {
        childImageSharp {
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
  `);

  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className='wrapp-header'>
      <header className='header'>
        <div className='menu'>
          <div className='menu-content' onClick={menuToggle}>
            <div className='img-wrapp'>
              <Menu />
            </div>
          </div>
          <div className='logo'>
            <Link to='/'>
              <Img fluid={data.file.childImageSharp.fluid} alt='yokino logo' />
            </Link>
          </div>
          <div className='header-search'>
            <Search />
          </div>
        </div>
      </header>
      <NavBar isOpen={isMenuOpen} toggleMenu={menuToggle} />
    </div>
  );
};

export default Header;
