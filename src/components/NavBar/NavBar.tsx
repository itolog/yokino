import { Link } from 'gatsby';
import React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Search from '../../shared/components/Search/Search';

// Store import
import { AppState } from '../../state/createStore';
import { Actions } from '../../state/menu/actions';
import { getMenu } from '../../state/menu/selectors';

import { Actions as menuActions } from '../../state/menu/actions';
import { Actions as paginationActions } from '../../state/pagination/actions';

import './navBar.scss';

// STORE PROPS
const mapStateToProps = (state: AppState) => {
  return {
    isMenuVisible: getMenu(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleMenu: () => dispatch(Actions.toggleMenu()),
  resetNextPage: () => dispatch(paginationActions.setNextPage('')),
  setCurrentPage: (payload: string) =>
    dispatch(menuActions.setCurrentPage(payload)),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const NavBar: React.FC<Props> = ({
  isMenuVisible,
  toggleMenu,
  resetNextPage,
  setCurrentPage,
}) => {
  const toggleLink = async (e: any) => {
    await setCurrentPage(e.target.textContent.trim());
    await resetNextPage();
    await toggleMenu();
  };

  return (
    <div
      className={
        isMenuVisible ? 'side-bar navbar-open' : 'side-bar navbar-close'
      }
    >
      <nav className='nav'>
        <div className='navbar-search'>
          <Search />
        </div>
        <ul className='navigation'>
          <li className='navigation--item' onClick={toggleLink}>
            <Link to='/' className='navigation--href'>
              <div className='href-text'> Фильмы</div>
            </Link>
          </li>
          <li className='navigation--item' onClick={toggleLink}>
            <Link to='/serials/' className='navigation--href'>
              <div className='href-text'>Сериалы</div>
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={
          isMenuVisible
            ? 'close-tab close-tab--open'
            : 'close-tab close-tab--close'
        }
        onClick={toggleMenu}
      />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
