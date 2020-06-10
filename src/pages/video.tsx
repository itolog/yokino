import { useQuery } from '@apollo/react-hooks';
import React, { memo, useEffect, useState } from 'react';
import useStyles from '../shared/styles/videoPage';

import { useLocation, useNavigate } from '@reach/router';

import { useDispatch, useSelector } from 'react-redux';

import ErrorBoundary from '../shared/components/ErrorBoundary/ErrorBoundary';
import Player from '../components/Player/Player';
import BannersCarousel from '../shared/banners/BannersCarousel/BannersCarousel';
import Error from '../shared/components/Error/Error';
import VideoInfo from '../shared/components/VideoInfo/VideoInfo';
// hooks
import useScreenWidth from '../shared/hooks/useScreenWidth';
import Layout from '../shared/Layout/Layout';

import ToggleFavoriteBtn from '../shared/UI/ToggleFavoriteBtn/ToggleFavoriteBtn';

import PartsCard from '../components/PartsCard/PartsCard';

// enums
import { ScreenType } from '../shared/interface/screen-type';
import { SIZE } from '../shared/interface/size';

import AddHeart from '../assets/img/add-to-favorite.svg';
import RemoveHeart from '../assets/img/remove-heart.svg';

import getBackDropUrl from '../shared/utils/getBackDropUrl';

import { GET_MOVIE } from '../shared/ggl/getMovie';

import Loader from '../shared/UI/Loader/Loader';

// store
import { AppState } from '../state/createStore';
import { Actions } from '../state/favorites-movies/actions';

// types
import { MovieInfo } from '../shared/generated/graphql';

const Video = memo(
  () => {
    // style
    const classes = useStyles();
    // Store
    const dispatch = useDispatch();
    const favoriteMoviesIds = useSelector((state: AppState) => state.favoriteMovie.ids);
    // NAvigate
    const location = useLocation();
    const navigate = useNavigate();

    const id = Number(location.search.split('=')[ 1 ]);
    const [ favorites, setFavorites ] = useState<boolean>();
    const [ urlBackdrop, setUrlBackdrop ] = useState('');
    const screenType = useScreenWidth();

    const { loading, error, data } = useQuery(GET_MOVIE, {
      variables: {
        id,
      },
    });

    const movie: MovieInfo = data && data.movieInfo;

    useEffect(() => {
      dispatch(Actions.loadFavorite());
    }, []);

    /* Some BUG...when first time navigate to Video page.
     * Lose query params ID
     * Redirect whith ID from state
     * Perhaps a hosting error or  Gatsby
     * */
    useEffect(() => {
      if (!id) {
        (async () => {
          // await navigate(`${location.pathname}?id=${idFromState}`, { replace: true });
          await navigate(`/`, { replace: true });
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
        const predicate = movie.id as never;
        const is = favoriteMoviesIds.includes(predicate);
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

    const PartsList = () => {
      if (!!movie.parts?.length) {
        return movie.parts?.filter(item => item !== id);
      }
      return [];
    };

    const addToFavorite = () => {
      if (movie.name && movie.id && movie.poster) {
        const payload = {
          title: movie.name,
          id: movie.id,
          poster_url: movie.poster,
        };
        dispatch(Actions.saveFavoriteMovie(payload));
      }
    };

    const removeFromFavorite = () => {
      if (movie.id) {
        dispatch(Actions.removeFavoriteMovie(movie.id));
      }
    };

    return (
      <>
        <Layout title={movie?.name} description={movie?.description}>
          <div className={classes.moviePage}>
            <div className={classes.favoriteBtn}>
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
            <div className={classes.videoMedia}>
              {/*  BACK DROP IMAGE */}
              <div className={classes.mediaBackdrop}>
                {movie.backdrop_path && (
                  <img
                    src={urlBackdrop}
                    className={classes.mediaBackdropImage}
                    loading='lazy'
                    alt={movie.name_eng || ''}
                  />
                )}
              </div>

              <BannersCarousel/>
              <ErrorBoundary>
                <Player src={movie?.iframe_url!} id={movie?.kinopoisk_id!}/>
              </ErrorBoundary>

            </div>
            <VideoInfo data={movie}/>
            {/* Recomendation */}
            {!!PartsList().length && (
              <div className={classes.partsMovie}>
                <h3 className={classes.partsMovieTitle}>Рекомендуем посмотреть</h3>
                <div className={classes.partsMovieContent}>
                  {PartsList().map(item => {
                    return <PartsCard key={item} id={item}/>;
                  })}
                </div>
              </div>
            )}
          </div>
        </Layout>
      </>
    );
  },
);

export default Video;
