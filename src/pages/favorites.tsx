import React, { memo, useEffect } from 'react';
import { Link } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from '../shared/styles/favoritePage';

import RemoveHeart from '../assets/img/remove-heart.svg';
import LazyImg from '../shared/components/LazyImg/LazyImg';
import MainBgImage from '../shared/components/MainBgImage/MainBgImage';
import { FavoriteMovies } from '../shared/interface/favorite-movies';
import Layout from '../shared/Layout/Layout';
// store
import { Actions } from '../state/favorites-movies/actions';
import { getFavoritesMovies } from '../state/favorites-movies/selectors';

const Favorites = memo(
  () => {
    const classes = useStyles();
    // Store
    const dispatch = useDispatch();
    const favorites = useSelector(getFavoritesMovies);

    useEffect(() => {
      dispatch(Actions.loadFavorite());
    }, []);

    const removeFavoriteItem = (
      event: React.SyntheticEvent<HTMLDivElement>,
    ) => {
      const id = Number(event.currentTarget.dataset.id);
      dispatch(Actions.removeFavoriteMovie(id));
    };
    return (
      <Layout title='избранное' description='избранное'>
        <MainBgImage/>
        <div className='home'>
          <h1 className={classes.favoritePageTitle}>Избранное</h1>
          {favorites.length === 0 && (
            <div className={classes.noFavorites}>избранных нет</div>
          )}
          <ul className={classes.favoriteList}>
            {[ ...favorites ].map((item: FavoriteMovies) => {
              return (
                <li
                  style={{ color: 'lime' }}
                  className={classes.favoriteItems}
                  key={item.id}
                >
                  <div
                    className={classes.removeFavoriteItems}
                    title='удалить'
                    data-id={item.id}
                    onClick={removeFavoriteItem}
                  >
                    <RemoveHeart/>
                  </div>
                  <Link
                    to={`/video/?id=${item.id}`}
                    aria-label='navigate to the video page'
                  >

                    <LazyImg
                      src={item.poster_url}
                      alt={item.title}
                      width='200px'
                      height='270px'
                    />

                    <div className={classes.favoriteItemsTitle}>{item.title}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    );
  },
);
export default Favorites;
