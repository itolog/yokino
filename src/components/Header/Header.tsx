import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux'

import { useScrollTrigger } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Search from '../../shared/components/Search/Search';

// Store import
import { Actions } from '../../state/menu/actions';
import { Actions as paginationActions } from '../../state/pagination/actions';

import { Actions as menuActions } from '../../state/menu/actions';

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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [ theme.breakpoints.up('sm') ]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [ theme.breakpoints.up('sm') ]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}


const Header = (props: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  //  MAIN LOGO IMAGE
  const data = useStaticQuery(graphql`
      query {
          file(relativePath: { eq: "icon-512x512.png" }) {
              childImageSharp {
                  fixed(width: 40, height: 40, quality: 90) {
                      ...GatsbyImageSharpFixed
                  }
              }
          }
      }
  `);

  const toHome = useCallback(() => {
    dispatch(paginationActions.setNextPage(1));
    dispatch(menuActions.setCurrentPage(1));
    // closeMenu();
  }, [dispatch]);

  const menuToggle = useCallback(() => {
    // toggle();
  }, []);


  return (
    <HideOnScroll {...props} >
      <AppBar className={classes.root}>
        <Toolbar className={classes.layout}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon/>
          </IconButton>
          {/*  LOGO */}
          <div className={classes.title} onClick={toHome}>
            <Link to='/'>
              <Img
                fixed={data.file.childImageSharp.fixed}
                alt='yokino logo'
              />
            </Link>
          </div>
          {/*SEARCH INPUT*/}
          <Search />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Header;
