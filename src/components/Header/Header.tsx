import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Menu from '../../assets/img/menu.svg';
import Search from '../../shared/components/Search/Search';
import NavBar from '../NavBar/NavBar';

// Store import
import { Actions } from '../../state/menu/actions';

import './Header.scss';

// STORE PROPS
const mapDispatchToProps = (dispatch: Dispatch) => ({
  MenuToggle: () => dispatch(Actions.toggleMenu()),
});

type Props = ReturnType<typeof mapDispatchToProps>;

const Header: React.FC<Props> = ({ MenuToggle }) => {
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
    MenuToggle();
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
      <NavBar />
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
