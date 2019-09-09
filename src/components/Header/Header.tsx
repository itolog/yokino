import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Menu from '../../assets/img/menu.svg';
import './Header.scss';

const Header = () => {
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
  return (
    <header className="header">
      <div className="menu">
        <div className="menu-content">
          <div className="img-wrapp">
            <Menu />
          </div>
        </div>
        <div className="logo">
          <Link to="/">
            <Img fluid={data.file.childImageSharp.fluid} alt="yokino logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
