import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import BannersCarousel from '../shared/banners/BannersCarousel/BannersCarousel';
import Error from '../shared/components/Error/Error';
import Layout from '../shared/components/Layout/Layout';
import Player from '../shared/components/Player/Player';
import VideoInfo from '../shared/components/VideoInfo/VideoInfo';
import ToggleFavoriteBtn from '../shared/UI/ToggleFavoriteBtn/ToggleFavoriteBtn';

import AddHeart from '../assets/img/add-to-favorite.svg';
import RemoveHeart from '../assets/img/remove-heart.svg';

import { GET_MOVIE } from '../shared/ggl/getMovie';

import '../shared/styles/videoPage.scss';
import Loader from '../shared/UI/Loader/Loader';

// store
import { AppState } from '../state/createStore';
import { Actions } from '../state/favorites-movies/actions';
import { getFavoriteMoviesIds } from '../state/favorites-movies/selectors';
import { FavoriteMovies } from './../shared/interface/favorite-movies';

interface IProps {
  location: Location;
}

const mapStateToProps = (state: AppState) => {
  return {
    favoriteMoviesIds: getFavoriteMoviesIds(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadDB: () => dispatch(Actions.loadFavorite()),
  saveMovie: (payload: FavoriteMovies) =>
    dispatch(Actions.saveFavoriteMovie(payload)),
  removeMovie: (payload: string) =>
    dispatch(Actions.removeFavoriteMovie(payload)),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const Video: React.FC<Props> = ({
  location,
  saveMovie,
  removeMovie,
  favoriteMoviesIds,
  loadDB,
}) => {
  const id = location.search.split('=')[1];
  const [favorites, setFavorites] = useState();

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  const movie = data && data.getMovie;

  useEffect(() => {
    loadDB();
  }, []);

  useEffect(() => {
    if (movie) {
      // @ts-ignore
      const is = favoriteMoviesIds.includes(movie.kinopoisk_id);
      setFavorites(is);
    }
  }, [favorites, favoriteMoviesIds, movie]);

  if (loading) return <Loader />;
  if (error) return <Error error={error.message} />;

  const addToFavorite = async () => {
    const payload = {
      title: movie.title,
      kinopoisk_id: movie.kinopoisk_id,
      poster_url: movie.material_data.poster_url,
    };
    await saveMovie(payload);
  };

  const removeFromFavorite = async () => {
    await removeMovie(movie.kinopoisk_id);
  };

  return (
    <>
      <Layout title={movie.title} description={movie.material_data.description}>
        <main className='movie-page'>
          <div className='favorite-btn'>
            {!favorites && (
              <ToggleFavoriteBtn handleEvent={addToFavorite}>
                <AddHeart />
              </ToggleFavoriteBtn>
            )}
            {favorites && (
              <ToggleFavoriteBtn handleEvent={removeFromFavorite}>
                <RemoveHeart />
              </ToggleFavoriteBtn>
            )}
          </div>

          <VideoInfo data={movie} />
          <div className='video-media'>
            <BannersCarousel />

            <Player src={movie.link} id={movie.kinopoisk_id} />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
