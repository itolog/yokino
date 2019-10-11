import { Link } from 'gatsby';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import '../shared/styles/favoritePage.scss';

import RemoveHeart from '../assets/img/remove-heart.svg';
import Layout from '../shared/components/Layout/Layout';
import LazyImg from '../shared/components/LazyImg/LazyImg';
import { FavoriteMovies } from '../shared/interface/favorite-movies';
// store
import { AppState } from '../state/createStore';
import { Actions } from '../state/favorites-movies/actions';
import { getFavoritesMovies } from '../state/favorites-movies/selectors';

const mapStateToProps = (state: AppState) => {
  return {
    favorites: getFavoritesMovies(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadDB: () => dispatch(Actions.loadFavorite()),
  removeItems: (id: string) => dispatch(Actions.removeFavoriteMovie(id)),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Favorites: React.FC<Props> = ({ favorites, loadDB, removeItems }) => {
  useEffect(() => {
    loadDB();
  }, []);
  const removeFavoriteItem = (id: string) => {
    removeItems(id);
  };
  return (
    <Layout title='избранное' description='избранное'>
      <main className='home'>
        <h1 className='favorite-page-title'>Избранное</h1>
        {favorites.length === 0 && (
          <div className='no-favorites'>избранных нет</div>
        )}
        <ul className='favorite-list'>
          {[...favorites].map((item: FavoriteMovies) => {
            return (
              <li
                style={{ color: 'lime' }}
                className='favorite-items'
                key={item.kinopoisk_id}
              >
                <div
                  className='remove-favorite-items'
                  title='удалить'
                  onClick={() => removeFavoriteItem(item.kinopoisk_id)}
                >
                  <RemoveHeart />
                </div>
                <Link
                  to={`/video/?id=${item.kinopoisk_id}`}
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
      </main>
    </Layout>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);