import { Link } from 'gatsby';
import React from 'react';
import './navBar.scss';

const NavBar = () => {
  return (
    <div className='side-bar'>
      <nav className='nav'>
        <ul className='navigation'>
          <li className='navigation--item'>
            <Link to='/' className='navigation--href'>
              <div className='href-text'> Фильмы</div>
            </Link>
          </li>
          <li className='navigation--item'>
            <Link to='/serials/' className='navigation--href'>
              <div className='href-text'>Сериалы</div>
            </Link>
          </li>
        </ul>
      </nav>
      <div className='close-tab' />
    </div>
  );
};

export default NavBar;
