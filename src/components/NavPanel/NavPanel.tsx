import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'gatsby';

import Drawer from '@material-ui/core/Drawer';

import { IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import LocalMovies from '@material-ui/icons/LocalMovies';
import MenuOpenTwoTone from '@material-ui/icons/MenuOpenTwoTone';
import Logo from '../../shared/UI/Logo/Logo';

import menuItems from './menuItems';

// STORE IMPORT
import { AppState } from '../../state/createStore';
import { Actions as menuActions } from '../../state/menu/actions';

const useStyles = makeStyles({
  '@global': {
    '.MuiDrawer-paperAnchorLeft': {
      backgroundImage: 'linear-gradient(to right, #051937, #0b1536, #121134, #180c32, #1e052e)',
      '&:hover': {
        boxShadow: '4px 5px 7px 0px rgba(206, 82, 212, 1)',
      },
    },
  },
  list: {
    width: '270px',
    paddingBottom: '7%',
    overflowX: 'hidden',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    backgroundImage: 'linear-gradient(to right, #0d1829, #0b1836, #111741, #201249, #32064e)',
    justifyContent: 'space-between',
  },
  link: {
    display: 'inherit',
    color: 'wheat',
    width: '100%',
    boxShadow: '4px 5px 7px 0px rgba(83, 153, 214, 1)',
    transition: '0.4s',
    margin: '2% 1%',
    padding: '2% 0',
    '&:hover': {
      boxShadow: '4px 5px 7px 0px rgba(206, 82, 212, 1)',
      color: 'orangered',
      textShadow: '5px 5px 10px rgba(83, 153, 214, 1)',
    },
  },
});


const NavPanel = memo(() => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: AppState) => state.menu.isMenuVisible);
  const classes = useStyles();

  const handleClose = () => {
    dispatch(menuActions.closeMenu());
  };

  const list = () => (
    <nav
      role='presentation'
      className={classes.list}
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <div className={classes.drawerHeader}>
        <Logo/>
        <IconButton onClick={handleClose}>
          <MenuOpenTwoTone color='secondary'/>
        </IconButton>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem button={true} key={item.id}>
            <Link
              to={item.link} className={classes.link}

            >
              <ListItemIcon>{<LocalMovies style={{ color: '#ab1ae6' }}/>}</ListItemIcon>
              <ListItemText primary={item.name}/>
            </Link>
          </ListItem>
        ))}

        <ListItem button={true}>
          <Link
            to='/favorites/'
            className={classes.link}
          >
            <ListItemIcon>{<Favorite style={{ color: 'red' }}/>}</ListItemIcon>
            <ListItemText primary='Избранное'/>
          </Link>
        </ListItem>
      </List>
    </nav>
  );

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={handleClose}
    >
      {list()}
    </Drawer>
  );
});

export default NavPanel;