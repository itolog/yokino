import { Link } from 'gatsby';
import React from 'react';

import Search from '../../shared/components/Search/Search';

import './navBar.scss';

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavBar: React.FC<Props> = ({ isOpen, toggleMenu }) => {
  return (
    <div className={isOpen ? 'side-bar navbar-open' : 'side-bar navbar-close'}>
      <nav className='nav'>
        <div className='navbar-search'>
          <Search />
        </div>
        <ul className='navigation'>
          <li className='navigation--item' onClick={toggleMenu}>
            <Link to='/' className='navigation--href'>
              <div className='href-text'> Фильмы</div>
            </Link>
          </li>
          <li className='navigation--item' onClick={toggleMenu}>
            <Link to='/test/' className='navigation--href'>
              <div className='href-text'>Сериалы</div>
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={
          isOpen ? 'close-tab close-tab--open' : 'close-tab close-tab--close'
        }
        onClick={toggleMenu}
      />
    </div>
  );
};

export default NavBar;
