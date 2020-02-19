import { Link } from 'gatsby';
import React, { useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import gsap from 'gsap';
import Search from '../../shared/components/Search/Search';
import AuthTokenService from '../../shared/services/authToken.service';
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
  resetNextPage: () => dispatch(paginationActions.setNextPage('')),
  setCurrentPage: (payload: string) =>
    dispatch(menuActions.setCurrentPage(payload)),
  loadUser: () => dispatch(userAction.loadUser()),
  deleteUser: () => dispatch(userAction.removeUser()),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const NavBar: React.FC<Props> = ({
                                   isMenuVisible,
                                   toggleMenu,
                                   resetNextPage,
                                   setCurrentPage,
                                   loadUser,
                                   isLogged,
                                   deleteUser,
                                 }) => {
  const menuRef = useRef(null);
  const backDropRef = useRef(null);
  const menuItemRef = useRef<HTMLUListElement>(null);

  const toggleLink = async (e: any) => {
    await setCurrentPage(e.target.textContent.trim());
    await resetNextPage();
    await toggleMenu();
  };

  const handleLogOut = async () => {
    await deleteUser();
    await toggleMenu();
  };

  useEffect(() => {
    const token$ = AuthTokenService.getAuthToken().subscribe(
      (data) => {
        if (data) {
          loadUser();
        }
      },
    );
    return function cleanUp() {
      token$.unsubscribe();
    };
  }, []);

  // ANIMATION MENU
  const tl = gsap.timeline();

  useEffect(() => {
    const menu = menuRef.current;
    const backDrop = backDropRef.current;
    const liItem = (menuItemRef?.current?.children) as HTMLCollection;
    if (isMenuVisible) {
      tl.to(menu, 0.2, { x: '0%', ease: 'power4.out' })
        .to(backDrop, 0.2, { x: '0%' ,ease: 'power4.out' })
        .to(backDrop, 0.1, { background: '#000000cc', ease: 'power4.in' })
        .fromTo(liItem, { rotateX: -100 }, {
          rotateX: 0,
          stagger: 0.1,
          ease: 'expo.inOut'
        });
    } else {
      tl.to(menu, { x: '-100%' });
      tl.to(backDrop,  { x: '-100%', background: '#00000083', ease: 'power4.in' });
    }
  }, [ isMenuVisible ]);

  return (
    <div
      ref={menuRef}
      className={'side-bar navbar-close'}
    >
      <nav className='nav'>
        <div className='navbar-search'>
          <Search/>
        </div>
        <ul ref={menuItemRef} className='navigation'>
          <li

            className='navigation--item'
            onClick={toggleLink}
          >
            <Link to='/' activeClassName='active' className='navigation--href'>
              <div className='href-text'> Фильмы</div>
            </Link>
          </li>
          <li

            className='navigation--item'
            onClick={toggleLink}
          >
            <Link
              to='/serials/'
              activeClassName='active'
              className='navigation--href'
            >
              <div className='href-text'>Сериалы</div>
            </Link>
          </li>
          <li

            className='navigation--item'
            onClick={toggleLink}
          >
            <Link
              to='/favorites/'
              activeClassName='active'
              className='navigation--href'
            >
              <div className='href-text'>избранное</div>
            </Link>
          </li>
        </ul>
        <div className='auth-btns'>
          {!isLogged && <Link
            to='/auth/'
            className='auth-login-btn'

            onClick={toggleLink}
          >
            войти
          </Link>}
          {isLogged && <Link
            to='/'
            className='logOut-btn'

            onClick={handleLogOut}
          >
            выйти
          </Link>}
        </div>
      </nav>
      <div
        ref={backDropRef}
        className='close-tab close-tab--close'
        onClick={toggleMenu}
      />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
