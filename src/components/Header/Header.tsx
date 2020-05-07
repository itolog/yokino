import React from 'react';

import { useDispatch } from 'react-redux';

import { useScrollTrigger } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import Search from '../../shared/components/Search/Search';
import Logo from '../../shared/UI/Logo/Logo';

// Store import
import { Actions } from '../../state/menu/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: 'rgba(26, 20, 59, 0.8)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    layout: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      display: 'none',
      [ theme.breakpoints.up('sm') ]: {
        display: 'block',
      },
    },
  }),
);

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
  const classes = useStyles();

  const menuOpen = () => {
   requestAnimationFrame(() => {
     dispatch(Actions.openMenu());
   })
  };


  return (
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
          <Search/>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
