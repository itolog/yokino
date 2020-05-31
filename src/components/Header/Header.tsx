import React from 'react';
import { Link } from 'gatsby';

import { useDispatch, useSelector } from 'react-redux';

import { useScrollTrigger } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import { AppState } from '../../state/createStore';
import Search from './Search/Search';
import Logo from '../../shared/UI/Logo/Logo';

// Store import
import { Actions } from '../../state/menu/actions';
import { Actions as actionsUser } from '../../state/user/actions';

import useStyles from './styles';

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: AppState) => state.user.isLogged);

  const classes = useStyles();
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    dispatch(actionsUser.removeUser());
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted={true}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isLogged
      && (<Link to='/auth'>
        <MenuItem onClick={handleMenuClose}><ExitToAppIcon/> войти</MenuItem>
      </Link>)
      }
      {isLogged && <MenuItem onClick={handleLogOut}>
        выйти
      </MenuItem>}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted={true}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const menuOpen = () => {
    requestAnimationFrame(() => {
      dispatch(Actions.openMenu());
    });
  };


  return (
    <div>
      <HideOnScroll {...props} >
        <AppBar className={classes.root}>

          <Toolbar className={classes.layout}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              onClick={menuOpen}
              aria-label='open drawer'
            >
              <MenuIcon color='secondary'/>
            </IconButton>
            {/*  LOGO */}
            <Logo classes={classes.title}/>
            {/*SEARCH INPUT*/}
            <div className={classes.searchContainer}>
              <Search/>
            </div>
            {/* ==================== APP-BAR MENU  ============================================  */}
            <div className={classes.sectionDesktop}>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle/>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon/>
              </IconButton>
            </div>
          </Toolbar>

        </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Header;