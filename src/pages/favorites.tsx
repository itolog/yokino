import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Layout from '../shared/components/Layout/Layout';
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
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Favorites: React.FC<Props> = ({ favorites, loadDB }) => {
  useEffect(() => {
    loadDB();

  }, []);

  return (
    <Layout title='избранное' description='избранное'>
      <div>
        <h1>нщнщнщщн</h1>

        {[ ...favorites ].map((item: any) => {
          return (
            <p key={item.kinopoisk_id} style={{ color: 'lime' }}>{item.title}</p>
          );
        })}
      </div>
    </Layout>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favorites);
