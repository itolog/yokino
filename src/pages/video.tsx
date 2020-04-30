import { useQuery } from '@apollo/react-hooks';
import React, { memo, useEffect, useState } from 'react';

import { useLocation, useNavigate } from '@reach/router';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Player from '../components/Player/Player';
import BannersCarousel from '../shared/banners/BannersCarousel/BannersCarousel';
import Error from '../shared/components/Error/Error';
import LazyImg from '../shared/components/LazyImg/LazyImg';
import VideoInfo from '../shared/components/VideoInfo/VideoInfo';
// hooks
import useScreenWidth from '../shared/hooks/useScreenWidth';
import Layout from '../shared/Layout/Layout';

import ToggleFavoriteBtn from '../shared/UI/ToggleFavoriteBtn/ToggleFavoriteBtn';

// enums
import { ScreenType } from '../shared/interface/screen-type';
import { SIZE } from '../shared/interface/size';

import AddHeart from '../assets/img/add-to-favorite.svg';
import RemoveHeart from '../assets/img/remove-heart.svg';

import getBackDropUrl from '../shared/utils/getBackDropUrl';

import { GET_MOVIE } from '../shared/ggl/getMovie';

import '../shared/styles/videoPage.scss';
import Loader from '../shared/UI/Loader/Loader';

import { FavoriteMovies } from '../shared/interface/favorite-movies';
// store
import { AppState } from '../state/createStore';
import { Actions } from '../state/favorites-movies/actions';
import { getFavoriteMoviesIds } from '../state/favorites-movies/selectors';

// types
import { MovieInfo } from '../shared/generated/graphql';

const mapStateToProps = (state: AppState) => {
  return {
    favoriteMoviesIds: getFavoriteMoviesIds(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadDB: () => dispatch(Actions.loadFavorite()),
  saveMovie: (payload: FavoriteMovies) =>
    dispatch(Actions.saveFavoriteMovie(payload)),
  removeMovie: (payload: number) =>
    dispatch(Actions.removeFavoriteMovie(payload)),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Video: React.FC<Props> = memo(
  ({ saveMovie, removeMovie, favoriteMoviesIds, loadDB }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const id = Number(location.search.split('=')[ 1 ]);
    const [ favorites, setFavorites ] = useState();
    const [ urlBackdrop, setUrlBackdrop ] = useState('');
    const screenType = useScreenWidth();
    // @ts-ignore
    const idFromState = location?.state?.id; /* Fix typing later  */

    const { loading, error, data } = useQuery(GET_MOVIE, {
      variables: {
        id: id || idFromState,
      },
    });

    const movie: MovieInfo = data && data.movieInfo;

    useEffect(() => {
      loadDB();
    }, [ loadDB ]);

    /* Some BUG...when first time navigate to Video page.
    * Lose query params ID
    * Redirect whith ID from state
    * Perhaps a hosting error or  Gatsby
    * */
    useEffect(() => {
      if (!id) {
        (async () => {
          await navigate(`${location.pathname}?id=${idFromState}`, { replace: true });
        })();
      }
    }, [ error?.networkError ]);


    // BACKDROP PATH
    useEffect(() => {
      const path = movie && movie?.backdrop_path;
      if (path) {
        if (screenType === ScreenType.MOBILE) {
          setUrlBackdrop(getBackDropUrl(path, SIZE.MEDIUM));
        } else if (
          screenType === ScreenType.LAPTOP ||
          screenType === ScreenType.TABLETS
        ) {
          setUrlBackdrop(getBackDropUrl(path, SIZE.LARGE));
        } else if (screenType === ScreenType.DESCTOP) {
          setUrlBackdrop(getBackDropUrl(path));
        }
      }
    }, [ screenType, movie ]);

    useEffect(() => {
      if (movie) {
        // @ts-ignore
        const is = favoriteMoviesIds.includes(movie.id);
        setFavorites(is);
      }
    }, [ favorites, favoriteMoviesIds, movie ]);

    if (loading)
      return (
        <div className='wrapp-loader'>
          <Loader/>
        </div>
      );
    if (error) return <Error error={error.message}/>;

    const addToFavorite = () => {
      if (movie.name && movie.id && movie.poster) {
        const payload = {
          title: movie.name,
          id: movie.id,
          poster_url: movie.poster,
        };
        saveMovie(payload);
      }
    };

    const removeFromFavorite = () => {
      if (movie.id) {
        removeMovie(movie.id);
      }
    };

    return (
      <>
        <Layout title={movie?.name} description={movie?.description}>
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
              <div className='media-backdrop'>
                {movie.backdrop_path && (
                  <LazyImg
                    src={urlBackdrop}
                    styleImage={{ objectFit: 'cover' }}
                    alt={movie.name_eng || ''}
                  />
                )}
              </div>

              <BannersCarousel/>
              <Player src={movie?.iframe_url!} id={movie?.kinopoisk_id!}/>
            </div>

            <VideoInfo data={movie}/>
          </main>
        </Layout>
      </>
    );
  },
);

export default connect(mapStateToProps, mapDispatchToProps)(Video);
