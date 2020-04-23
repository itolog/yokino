/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions,
jsx-a11y/no-static-element-interactions */
import { Link } from 'gatsby';
import React, { memo, useRef } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import CloseBtn from '../../shared/UI/CloseBtn/CloseBtn';

import menuItems from './menuItems';

// Store import
import { AppState } from '../../state/createStore';
import { Actions, Actions as menuActions } from '../../state/menu/actions';
import { getMenu } from '../../state/menu/selectors';
import { Actions as paginationActions } from '../../state/pagination/actions';
import { Actions as userAction } from '../../state/user/actions';
import { isLoggedUser } from '../../state/user/selectors';

import './navBar.scss';

// STORE PROPS
const mapStateToProps = (state: AppState) => {
  return {
    isMenuVisible: getMenu(state),
    isLogged: isLoggedUser(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleMenu: () => dispatch(Actions.toggleMenu()),
  resetNextPage: () => dispatch(paginationActions.setNextPage(1)),
  setCurrentPage: (payload: number) =>
    dispatch(menuActions.setCurrentPage(payload)),
  loadUser: () => dispatch(userAction.loadUser()),
  deleteUser: () => dispatch(userAction.removeUser()),
  closeMenu: () => dispatch(Actions.closeMenu()),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const NavBar: React.FC<Props> = memo(
  ({
     isMenuVisible,
     toggleMenu,
     resetNextPage,
     setCurrentPage,
     loadUser,
     closeMenu,
   }) => {
    const menuRef = useRef(null);
    const menuItemRef = useRef<HTMLUListElement>(null);

    const toggleLink = (e: any) => {
      setCurrentPage(e.target.textContent.trim());
      resetNextPage();
      toggleMenu();
    };

    return (
      <div
        ref={menuRef}
        className={
          isMenuVisible ? 'side-bar slide-rotate-hor-bot' : 'side-bar'
        }>
        <nav className='nav'>
          <div className='navbar-closebtn'>
            <CloseBtn onclick={closeMenu} />
          </div>
          <ul ref={menuItemRef} className='navigation'>
            {menuItems.map(item => {
              return (
                <li
                  key={item.id}
                  className='navigation--item'
                  onClick={toggleLink}>
                  <Link
                    to={item.link}
                    activeClassName='active'
                    className='navigation--href'>
                    <div className='href-text'> {item.name}</div>
                  </Link>
                </li>
              );
            })}
          </ul>

        </nav>
      </div>
    );
  },
);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);