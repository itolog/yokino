/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions,
jsx-a11y/no-static-element-interactions */
import { Link } from 'gatsby';
import React, { useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import gsap from 'gsap';
import Search from '../../shared/components/Search/Search';
import AuthTokenService from '../../shared/services/authToken.service';
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

const NavBar: React.FC<Props> = ({
  isMenuVisible,
  toggleMenu,
  resetNextPage,
  setCurrentPage,
  loadUser,
  closeMenu,
}) => {
  const menuRef = useRef(null);
  const backDropRef = useRef(null);
  const menuItemRef = useRef<HTMLUListElement>(null);

  const toggleLink = (e: any) => {
    setCurrentPage(e.target.textContent.trim());
    resetNextPage();
    toggleMenu();
  };

  // const handleLogOut = async () => {
  //   await deleteUser();
  //   await toggleMenu();
  // };

  // useEffect(() => {
  //   if (!isHeaderVisible) {
  //     closeMenu();
  //   }
  // }, [isHeaderVisible, closeMenu]);

  useEffect(() => {
    const token$ = AuthTokenService.getAuthToken().subscribe(data => {
      if (data) {
        loadUser();
      }
    });
    return function cleanUp() {
      token$.unsubscribe();
    };
  }, [loadUser]);

  // ANIMATION MENU
  const tl = gsap.timeline();

  useEffect(() => {
    const menu = menuRef.current;
    const liItem = menuItemRef?.current?.children as HTMLCollection;
    if (isMenuVisible) {
      tl.fromTo(menu, { y: '-100%' }, { duration: 0.1, y: 0 });
      // .fromTo(
      //   liItem,
      //   { scale: 0 },
      //   {
      //     scale: 1,
      //     stagger: 0.1,
      //     ease: 'expo.inOut',
      //   },
      // );
    } else {
      tl.to(menu, {
        duration: 0.5,
        y: '-200%',
      });
      // tl.to(menu, { y: '-150%', scale: 0 });
    }
  }, [isMenuVisible, tl]);

  return (
    <div ref={menuRef} className={'side-bar navbar-close'}>
      <nav className='nav'>
        <div className='navbar-closebtn'>
          <CloseBtn onclick={closeMenu} />
        </div>
        <div className='navbar-search'>
          <Search />
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
        {/*<div className='auth-btns'>*/}
        {/*  {!isLogged && <Link*/}
        {/*    to='/auth/'*/}
        {/*    className='auth-login-btn'*/}

        {/*    onClick={toggleLink}*/}
        {/*  >*/}
        {/*    войти*/}
        {/*  </Link>}*/}
        {/*  {isLogged && <Link*/}
        {/*    to='/'*/}
        {/*    className='logOut-btn'*/}

        {/*    onClick={handleLogOut}*/}
        {/*  >*/}
        {/*    выйти*/}
        {/*  </Link>}*/}
        {/*</div>*/}
      </nav>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
