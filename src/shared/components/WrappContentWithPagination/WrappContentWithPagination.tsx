import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Carousel from '../../../components/Carousel/Carousel';
// Store import
import { AppState } from '../../../state/createStore';

import { getCurrentPage } from '../../../state/menu/selectors';
import { Actions as filterActions } from '../../../state/movie-filter/actions';
import { getMovieCamripState, getMovieGenresState, getMovieYearState } from '../../../state/movie-filter/selectors';

import { Actions as paginationActions } from '../../../state/pagination/actions';
// Banners
import AliExpress from '../../banners/AliExpress/AliExpress';
import CinemaPagination from '../../components/CinemaPagination/CinemaPagination';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import MovieCard from '../../components/MovieCard/MovieCard';

import genres from '../../data/genresData.json';
import { yearDataRange } from '../../data/yearDataRange';

import CustomCheckBox from '../../UI/CustomCheckBox/CustomCheckBox';
import CustomSelect from '../../UI/CustomSelect/CustomSelect';

import LastSerials from '../../components/LastSerials/LastSerials';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import SkeletonLoader from '../../UI/SkeletonLoader/SkeletonLoader';

import './wrappContentWithPagination.scss';

interface IProps {
  error: any;
  mediaData: any;
  loading: boolean;
  title: string;
}

const mapStateToProps = (state: AppState) => {
  return {
    isCamrip: getMovieCamripState(state),
    movieYear: getMovieYearState(state),
    movieGenres: getMovieGenresState(state),
    currentPage: getCurrentPage(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNextPage: (payload: string) =>
    dispatch(paginationActions.setNextPage(payload)),
  setMovieYear: (payload: string) =>
    dispatch(filterActions.setMoviesYear(payload)),
  toggleCamrip: (payload: boolean) =>
    dispatch(filterActions.toggleMoviesCamrip(payload)),
  resetFilter: () => dispatch(filterActions.resetFilters()),
  setMovieGenres: (payload: string) =>
    dispatch(filterActions.setMoviesGenres(payload)),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const WrappContentWithPagination: React.FC<Props> = ({
                                                       error,
                                                       mediaData,
                                                       loading,
                                                       title,
                                                       isCamrip,
                                                       movieYear,
                                                       movieGenres,
                                                       currentPage,
                                                       setNextPage,
                                                       setMovieYear,
                                                       toggleCamrip,
                                                       resetFilter,
                                                       setMovieGenres,
                                                     }) => {

  const currentYear = new Date().getFullYear().toString();
  const handleNextPage = () => {
    setNextPage(mediaData.next_page);
  };

  const handlePrevPage = () => {
    setNextPage(mediaData.prev_page);
  };

  const handleYearChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
    setMovieYear(String(e.target.value));
  };
  const handleGenresChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
    setMovieGenres(String(e.target.value));
  };

  const handleCamripChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Boolean(event.target.value);
    toggleCamrip(value);
  };

  useEffect(() => {
    return function cleanUp() {
      resetFilter();
    };
  }, []);

  if (error) return <Error error={error}/>;

  const results: any = mediaData && mediaData.results;

  return (
    <>
      <Layout title={title} description='cinema online serials'>
        <main className='home'>
          {loading && <ProgressBar loading={loading}/>}
          {/* Slick Carousel */}
          <Carousel/>
          {/* Banner */}
          <AliExpress/>
          <div className='container-filter'>
            <div className='pick-year'>
              {!isCamrip && (
                <CustomSelect
                  options={yearDataRange()}
                  onChange={handleYearChange}
                />
              )}
            </div>
            <div className='pick-genres'>
              {!isCamrip && (
                <CustomSelect
                  options={genres.genres}
                  onChange={handleGenresChange}
                />
              )}
            </div>
            {currentYear === movieYear &&
            movieGenres === '' &&
            currentPage !== 'Сериалы' && (
              <div className='pick-camrip'>

                <CustomCheckBox
                  isChecked={isCamrip}
                  handleChange={handleCamripChange}
                  label='camrip'
                />

              </div>
            )}
          </div>
          <CinemaPagination
            prevLink={mediaData.prev_page}
            nextLink={mediaData.next_page}
            prev={handlePrevPage}
            next={handleNextPage}
          >
          <div className='wrapp-list-serials'>
            <h4 className='wrapp-list-serials--title'>Обновления сериалов</h4>
            <LastSerials />
          </div>
           <div className='movie-card--list'>
             {loading && <SkeletonLoader/>}
             {!loading &&
             results.map((item: any) => {
               return (
                 <MovieCard
                   key={item.kinopoisk_id}
                   title={item.title}
                   poster={item.material_data.poster_url}
                   material_data={item.material_data}
                   imdb_rating={item.material_data.imdb_rating}
                   kinopoisk_id={item.kinopoisk_id}
                   quality={item.quality}
                   kinopoisk_rating={item.material_data.kinopoisk_rating}
                   last_episode={item.last_episode}
                   last_season={item.last_season}
                 />
               );
             })}
           </div>
          </CinemaPagination>
        </main>
      </Layout>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappContentWithPagination);
