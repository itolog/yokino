/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions,
jsx-a11y/no-static-element-interactions */
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pairwise,
  share,
  throttleTime,
} from 'rxjs/operators';

import Menu from '../../assets/img/menu.svg';
import Search from '../../shared/components/Search/Search';
import NavBar from '../NavBar/NavBar';

// Store import
import { Actions } from '../../state/menu/actions';
import { Actions as paginationActions } from '../../state/pagination/actions';

import { Actions as menuActions } from '../../state/menu/actions';

import './Header.scss';

// STORE PROPS
const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: () => dispatch(Actions.toggleMenu()),
  resetNextPage: () => dispatch(paginationActions.setNextPage('')),
  setCurrentPage: () => dispatch(menuActions.setCurrentPage('')),
});

type Props = ReturnType<typeof mapDispatchToProps>;

const Header: React.FC<Props> = ({ toggle, resetNextPage, setCurrentPage }) => {
  enum Direction {
    Up = 'Up',
    Down = 'Down',
  }

  const [ headerVisible, setHeaderVisible ] = useState(true);

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

  const menuToggle = useCallback(() => {
    toggle();
  }, [ toggle ]);

  const toHome = useCallback(() => {
    resetNextPage();
    setCurrentPage();
  }, [ resetNextPage, setCurrentPage ]);

  useEffect(() => {
    const $scroll = fromEvent(window, 'scroll').pipe(
      throttleTime(100),
      map(() => window.pageYOffset),
      pairwise(),
      map(([ y1, y2 ]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share(),
    );

    const scrollEvent = $scroll.subscribe(direction => {
      if (direction === Direction.Up) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(false);
      }
    });
    return function cleanup() {
      scrollEvent.unsubscribe();
    };
  }, [ Direction.Up, Direction.Down ]);

  return (
    <div
      className={
        headerVisible ? 'wrapp-header show-header' : 'wrapp-header hide-header'
      }
    >
      <header className='header'>
        <div className='menu'>
          <div className='menu-content' onClick={menuToggle}>
            <div className='img-wrapp'>
              <Menu/>
            </div>
          </div>
          <div className='logo' onClick={toHome}>
            <Link to='/'>
              <Img fixed={data.file.childImageSharp.fixed} alt='yokino logo'/>
            </Link>
          </div>
          <div className='header-search'>
            <Search/>
          </div>
        </div>
      </header>
      <NavBar
        isHeaderVisible={headerVisible}
      />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Header);
