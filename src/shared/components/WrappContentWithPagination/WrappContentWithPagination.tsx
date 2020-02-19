import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Carousel from '../../../components/Carousel/Carousel';
// Store import
import { AppState } from '../../../state/createStore';

import { getCurrentPage } from '../../../state/menu/selectors';
import { Actions as filterActions } from '../../../state/movie-filter/actions';
import { getMovieYearState } from '../../../state/movie-filter/selectors';

import { Actions as paginationActions } from '../../../state/pagination/actions';
// Banners
import AliExpress from '../../banners/AliExpress/AliExpress';
import CinemaPagination from '../../components/CinemaPagination/CinemaPagination';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import MovieCard from '../../components/MovieCard/MovieCard';

import { yearDataRange } from '../../data/yearDataRange';

import CustomSelect from '../../UI/CustomSelect/CustomSelect';

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
    movieYear: getMovieYearState(state),
    currentPage: getCurrentPage(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNextPage: (payload: string) =>
    dispatch(paginationActions.setNextPage(payload)),
  setMovieYear: (payload: string) =>
    dispatch(filterActions.setMoviesYear(payload)),
  resetFilter: () => dispatch(filterActions.resetFilters()),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const WrappContentWithPagination: React.FC<Props> = ({
  error,
  mediaData,
  loading,
  title,
  setNextPage,
  setMovieYear,
  resetFilter,
}) => {
  const nextPage = String(mediaData?.current_page + 1);
  const prevPage = String(mediaData?.current_page - 1);

  const handleNextPage = () => {
    setNextPage(nextPage);
  };

  const handlePrevPage = () => {
    setNextPage(prevPage);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMovieYear(String(e.target.value));
  };

  useEffect(() => {
    return function cleanUp() {
      resetFilter();
    };
  }, []);

  if (error) return <Error error={error} />;

  const results: any = mediaData && mediaData.data;

  return (
    <>
      <Layout title={title} description='cinema online serials'>
        <main className='home'>
          {loading && <ProgressBar loading={loading} />}
          {/* Slick Carousel */}
          <Carousel/>
          {/* Banner */}
          <AliExpress />
          <div className='container-filter'>
            <div className='pick-year'>
              <CustomSelect
                options={yearDataRange()}
                onChange={handleYearChange}
              />
            </div>
          </div>
          <CinemaPagination
            prevLink={prevPage}
            nextLink={nextPage}
            lastPage={mediaData?.last_page}
            prev={handlePrevPage}
            next={handleNextPage}
          >
            {/* <div className='wrapp-list-serials'>
              <h4 className='wrapp-list-serials--title'>Обновления сериалов</h4>
              <LastSerials />
            </div> */}
            <div className='movie-card--list'>
              {loading && <SkeletonLoader />}
              {!loading &&
                results.map((item: any) => {
                  return (
                    <MovieCard
                      key={item.id}
                      title={item.ru_title}
                      poster={item.poster}
                      kinopoisk_id={item.kinopoisk_id}
                      imdb_id={item.imdb_id}
                      last_episode={item.episode_count}
                      last_season={item.season_count}
                      year={item.year || item.start_date}
                      iframe_src={item.iframe_src}
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
  mapDispatchToProps
)(WrappContentWithPagination);
