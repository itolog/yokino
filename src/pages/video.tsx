import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';

import { Link, WindowLocation } from '@reach/router';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import BannersCarousel from '../shared/banners/BannersCarousel/BannersCarousel';
import Error from '../shared/components/Error/Error';
import Layout from '../shared/components/Layout/Layout';
import LazyImg from '../shared/components/LazyImg/LazyImg';
import Player from '../shared/components/Player/Player';
import VideoInfo from '../shared/components/VideoInfo/VideoInfo';
// hooks
import useScreenWidth from '../shared/hooks/useScreenWidth';

import ToggleFavoriteBtn from '../shared/UI/ToggleFavoriteBtn/ToggleFavoriteBtn';

// enums
import { ScreenType } from '../shared/interface/screen-type';
import { SIZE } from '../shared/interface/size';

import AddHeart from '../assets/img/add-to-favorite.svg';
import RemoveHeart from '../assets/img/remove-heart.svg';

import getBackDropUrl from '../shared/utils/getBackDropUrl';
import posterUrl from '../shared/utils/posterUrl';

import { GET_MOVIE } from '../shared/ggl/getMovie';

import '../shared/styles/videoPage.scss';
import Loader from '../shared/UI/Loader/Loader';

import { FavoriteMovies } from '../shared/interface/favorite-movies';
// store
import { AppState } from '../state/createStore';
import { Actions } from '../state/favorites-movies/actions';
import { getFavoriteMoviesIds } from '../state/favorites-movies/selectors';

interface IState {
  kinopoisk_id: string;
  imdb_id: string;
  iframe_src: string;
}

interface IProps extends Link<IState> {
  location: WindowLocation;
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
  const id = location.search.split('=')[ 1 ];
  const [ favorites, setFavorites ] = useState();
  const [ urlBackdrop, setUrlBackdrop ] = useState('');
  const screenType = useScreenWidth();

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  const movie = data && data.getMovie;

  useEffect(() => {
    loadDB();
  }, [ loadDB ]);

  // BACKDROP PATH ADAPTIVE
  useEffect(() => {
    const path = movie && movie.media_info && movie.media_info.backdrop_path;
    if (screenType === ScreenType.MOBILE) {
      setUrlBackdrop(getBackDropUrl(path, SIZE.MEDIUM));
    } else if (screenType === ScreenType.LAPTOP || screenType === ScreenType.TABLETS) {
      setUrlBackdrop(getBackDropUrl(path, SIZE.LARGE));
    } else if (screenType === ScreenType.DESCTOP) {
      setUrlBackdrop(getBackDropUrl(path));
    }
  }, [ screenType, movie ]);


  useEffect(() => {
    if (movie) {
      // @ts-ignore
      const is = favoriteMoviesIds.includes(movie.kp_id);
      setFavorites(is);
    }
  }, [ favorites, favoriteMoviesIds, movie ]);

  if (loading) return <Loader/>;
  if (error) return <Error error={error.message}/>;

  const addToFavorite = async () => {
    if (movie.title && movie.kp_id) {
      const payload = {
        title: movie.title,
        kinopoisk_id: movie.kp_id,
        poster_url: posterUrl(movie.kp_id),
      };
      await saveMovie(payload);
    }
  };

  const removeFromFavorite = async () => {
    if (movie.kp_id) {
      await removeMovie(movie.kp_id);
    }
  };

  return (
    <>
      <Layout title={movie?.title} description={movie?.description}>
        <main className='movie-page'>

          <div className='favorite-btn'>
            {!favorites && (
              <ToggleFavoriteBtn handleEvent={addToFavorite}>
                <AddHeart/>
              </ToggleFavoriteBtn>
            )}
            {favorites && (
              <ToggleFavoriteBtn handleEvent={removeFromFavorite}>
                <RemoveHeart/>
              </ToggleFavoriteBtn>
            )}
          </div>
          <div className='video-media'>
            {/*  BACK DROP IMAGE */}
            {movie.media_info && movie.media_info.backdrop_path &&
            <div className='media-backdrop'>
              <LazyImg
                src={urlBackdrop}
                styleImage={{ objectFit: 'cover' }}
                alt={movie.orig_title}
              />
            </div>
            }

            <BannersCarousel/>
            <Player src={movie?.iframe_src} id={movie?.kp_id}/>
          </div>

          <VideoInfo data={movie} poster={posterUrl(movie.kp_id)}/>
        </main>
      </Layout>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
