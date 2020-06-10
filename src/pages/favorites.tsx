/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions,
jsx-a11y/no-static-element-interactions */
import { Link } from 'gatsby';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../shared/styles/favoritePage.scss';

import RemoveHeart from '../assets/img/remove-heart.svg';
import LazyImg from '../shared/components/LazyImg/LazyImg';
import MainBgImage from '../shared/components/MainBgImage/MainBgImage';
import { FavoriteMovies } from '../shared/interface/favorite-movies';
import Layout from '../shared/Layout/Layout';
// store
import { AppState } from '../state/createStore';
import { Actions } from '../state/favorites-movies/actions';


const Favorites = memo(
  () => {
    // Store
    const dispatch = useDispatch();
    const favorites = useSelector((state: AppState) => state.favoriteMovie.movies);

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
          <h1 className='favorite-page-title'>Избранное</h1>
          {favorites.length === 0 && (
            <div className='no-favorites'>избранных нет</div>
          )}
          <ul className='favorite-list'>
            {[ ...favorites ].map((item: FavoriteMovies) => {
              return (
                <li
                  style={{ color: 'lime' }}
                  className='favorite-items'
                  key={item.id}
                >
                  <div
                    className='remove-favorite-items'
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
                    <div className='favorite-items--poster'>
                      <LazyImg
                        src={item.poster_url}
                        alt={item.title}
                        width='200px'
                        height='270px'
                      />
                    </div>
                    <div className='favorite-items--title'>{item.title}</div>
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
