import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Carousel from '../../../components/Carousel/Carousel';
// Store import
import { AppState } from '../../../state/createStore';

import { getCurrentPage } from '../../../state/menu/selectors';
import { Actions as filterActions } from '../../../state/movie-filter/actions';
import { getMovieYearState } from '../../../state/movie-filter/selectors';

import { Actions as paginationActions } from '../../../state/pagination/actions';
import CinemaPagination from '../../components/CinemaPagination/CinemaPagination';
import MovieCard from '../../components/MovieCard/MovieCard';
import Layout from '../../Layout/Layout';
import MainBgImage from '../MainBgImage/MainBgImage';

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

import './wrappContentWithPagination.scss';

interface IProps {
  mediaData: any;
  loading: boolean;
  title: string;
}

const mapStateToProps = (state: AppState) => {
  return {
    movieYear: getMovieYearState(state),
    currentPage: getCurrentPage(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNextPage: (payload: number) =>
    dispatch(paginationActions.setNextPage(payload)),
  setMovieYear: (payload: number) =>
    dispatch(filterActions.setMoviesYear(payload)),
  setMovieGenre: (payload: number) =>
    dispatch(filterActions.setMoviesGenres(payload)),
  resetFilter: () => dispatch(filterActions.resetFilters()),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const WrappContentWithPagination: React.FC<Props> = memo(
  ({
     mediaData,
     loading,
     title,
     setNextPage,
     setMovieGenre,
     setMovieYear,
     resetFilter,
   }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentPage = Number(location.search.split('=')[ 1 ]) || 1;
    const lastPage =
      Number((mediaData?.total / constants.MOVIE_PER_PAGE).toFixed()) || 1;

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // await navigate(`${location.pathname}?page=1`, { replace: true });
      setMovieYear(Number(e.target.value));
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMovieGenre(Number(e.target.value));
      // await navigate(`${location.pathname}?page=1`, { replace: true });
    };

    const handleToPage = async (event: React.ChangeEvent<unknown>, value: number) => {
      await navigate(`${location.pathname}?page=${value}`, { replace: true });
    };

    useEffect(() => {
      return function cleanUp() {
        resetFilter();
      };
    }, [ resetFilter ]);

    const results: Movie[] = mediaData && mediaData.results;

    return (
      <Layout title={title} description='cinema online serials'>
        <MainBgImage/>
        <main className='home'>
          {/* Slick Carousel */}
          <Carousel/>
          {/*  Collection  */}
          <CollectionModal/>
          <div className='container-filter'>
            <div className='pick-year'>
              <CustomSelect
                options={yearDataRange()}
                onChange={handleYearChange}
              />
            </div>

            <div className='pick-genres'>
              <CustomSelect
                options={genres.genres}
                onChange={handleGenreChange}
              />
            </div>
          </div>
          {loading && <ProgressBar loading={loading}/>}
          <CinemaPagination
            setPage={handleToPage}
            currentPage={currentPage}
            lastPage={lastPage}
          >
            <div className='wrapp-list-serials'>
              <h4 className='wrapp-list-serials--title'>
                Обновления сериалов
              </h4>
              <LastSerials/>
            </div>
            <div className='movie-card--list'>
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
        </main>
      </Layout>
    );
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappContentWithPagination);
