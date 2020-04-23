import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux'

import { useScrollTrigger } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
// ICONS
import MenuIcon from '@material-ui/icons/Menu';
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
      marginLeft: theme.spacing(2),
    },
    layout: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse'
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
    dispatch(Actions.toggleMenu());
  }, []);


  return (
    <HideOnScroll {...props} >
      <AppBar className={classes.root}>
        <Toolbar className={classes.layout}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            onClick={menuToggle}
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
