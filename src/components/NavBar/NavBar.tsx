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

import menuItems from './menuItems';

// Store import
import { AppState } from '../../state/createStore';
import { Actions, Actions as menuActions } from '../../state/menu/actions';
import { getMenu } from '../../state/menu/selectors';
import { Actions as paginationActions } from '../../state/pagination/actions';
import { Actions as userAction } from '../../state/user/actions';
import { isLoggedUser } from '../../state/user/selectors';

import './navBar.scss';

interface IProps {
  isHeaderVisible: boolean;
}

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
  ReturnType<typeof mapStateToProps> &
  IProps;

const NavBar: React.FC<Props> = ({
  isMenuVisible,
  toggleMenu,
  resetNextPage,
  setCurrentPage,
  loadUser,
  isHeaderVisible,
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

  useEffect(() => {
    if (!isHeaderVisible) {
      closeMenu();
    }
  }, [isHeaderVisible, closeMenu]);

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
    const backDrop = backDropRef.current;
    const liItem = menuItemRef?.current?.children as HTMLCollection;
    if (isMenuVisible) {
      tl.to(menu, 0.1, { x: '0%', ease: 'power4.out' })
        .fromTo(
          liItem,
          { rotateX: -100 },
          {
            rotateX: 0,
            stagger: 0.1,
            ease: 'expo.inOut',
          },
        )
        .to(backDrop, { x: '0%', ease: 'power2.out' })
        .to(backDrop, { background: '#000000cc', ease: 'power1.out' });
    } else {
      tl.to(menu, { x: '-100%' });
      tl.to(backDrop, {
        x: '200vw',
        background: '#00000083',
        ease: 'power4.in',
      });
    }
  }, [isMenuVisible, tl]);

  return (
    <div ref={menuRef} className={'side-bar navbar-close'}>
      <nav className='nav'>
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
          {/* <li className='navigation--item' onClick={toggleLink}>
            <Link to='/' activeClassName='active' className='navigation--href'>
              <div className='href-text'> Фильмы</div>
            </Link>
          </li>
          <li className='navigation--item' onClick={toggleLink}>
            <Link
              to='/serials/'
              activeClassName='active'
              className='navigation--href'>
              <div className='href-text'>Сериалы</div>
            </Link>
          </li>
          <li className='navigation--item' onClick={toggleLink}>
            <Link
              to='/favorites/'
              activeClassName='active'
              className='navigation--href'>
              <div className='href-text'>избранное</div>
            </Link>
          </li> */}
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
      <div
        ref={backDropRef}
        className='close-tab close-tab--close'
        onClick={toggleMenu}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
