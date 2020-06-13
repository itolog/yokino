import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Carousel from '../../../components/Carousel/Carousel';
// Store import

import { Actions as filterActions } from '../../../state/movie-filter/actions';

import CinemaPagination from '../../../components/CinemaPagination/CinemaPagination';
import MovieCard from '../../components/MovieCard/MovieCard';
import Layout from '../../Layout/Layout';
import MainBgImage from '../MainBgImage/MainBgImage';

import BannerHorisontal from '../../banners/BannerHorisontal/BannerHorisontal';

import constants from '../../constants/constants';
import genres from '../../data/genresData.json';
import { yearDataRange } from '../../data/yearDataRange';

import CustomSelect from '../../UI/CustomSelect/CustomSelect';

import { useLocation, useNavigate } from '@reach/router';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import SkeletonLoader from '../../UI/SkeletonLoader/SkeletonLoader';

import { Movie } from 'src/shared/generated/graphql';
import CollectionModal from '../../../components/CollectionModal/CollectionModal';
import LastSerials from '../../../components/LastSerials/LastSerials';

import useStyles from './styles';

interface Props {
  mediaData: any;
  loading: boolean;
  title: string;
}

const WrappContentWithPagination: React.FC<Props> = memo(
  ({
     mediaData,
     loading,
     title,
   }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const currentPage = Number(location.search.split('=')[ 1 ]) || 1;
    const lastPage = Math.ceil(mediaData?.total / constants.MOVIE_PER_PAGE);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(filterActions.setMoviesYear(Number(e.target.value)))
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(filterActions.setMoviesGenres(Number(e.target.value)))
    };

    const handleToPage = async (event: React.ChangeEvent<unknown>, value: number) => {
      await navigate(`${location.pathname}?page=${value}`, { replace: true });
    };

    useEffect(() => {
      return function cleanUp() {
        dispatch(filterActions.resetFilters())
      };
    }, [ dispatch ]);

    const results: Movie[] = mediaData && mediaData.results;

    return (
      <Layout title={title} description='cinema online serials'>
        <MainBgImage/>
        <div className='home'>
          {/* Slick Carousel */}
          <Carousel/>

          {/*  Collection  */}
          <CollectionModal/>
          <div className={classes.containerFilter}>
            <div className={classes.pickYear}>
              <CustomSelect
                options={yearDataRange()}
                onChange={handleYearChange}
              />
            </div>

            <div className={classes.pickGenres}>
              <CustomSelect
                options={genres.genres}
                onChange={handleGenreChange}
              />
            </div>
          </div>
          <div className={classes.wrappProgressBar}>
            {loading && <ProgressBar loading={loading}/>}
          </div>

          <CinemaPagination
            setPage={handleToPage}
            currentPage={currentPage}
            lastPage={lastPage}
          >
            <div className={classes.wrappListSerials}>
              <h4 className={classes.wrappListSerialsTitle}>
                Обновления сериалов
              </h4>
              <LastSerials/>
            </div>
            <div className={classes.movieCardList}>
              {!loading && !results.length && (
                <h2 className='not-found'>ничего не найдено</h2>
              )}
              {!results && <SkeletonLoader/>}
              {results &&
              results.map((item: Movie, index: number) => {
                return (
                  <MovieCard
                    key={item.id || index}
                    title={item.name}
                    poster={item.poster}
                    id={item.id}
                    imdb_id={item.imdb_id}
                    year={item.year}
                    iframe_src={item.iframe_url}
                    kinopoisk_rating={item.kinopoisk}
                    imdb_rating={item.imdb}
                    quality={item.quality}
                  />
                );
              })}
            </div>
          </CinemaPagination>
          {/* BannerHorisontal */}
          <BannerHorisontal/>
        </div>
      </Layout>
    );
  },
);

export default WrappContentWithPagination;
