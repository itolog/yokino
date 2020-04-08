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
import CinemaPagination from '../../components/CinemaPagination/CinemaPagination';
import Layout from '../../components/Layout/Layout';
import MovieCard from '../../components/MovieCard/MovieCard';
import MainBgImage from '../MainBgImage/MainBgImage';

import { yearDataRange } from '../../data/yearDataRange';

import CustomSelect from '../../UI/CustomSelect/CustomSelect';

import { useLocation, useNavigate } from '@reach/router';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import SkeletonLoader from '../../UI/SkeletonLoader/SkeletonLoader';

import { Movie } from 'src/shared/generated/graphql';
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
  resetFilter: () => dispatch(filterActions.resetFilters()),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const WrappContentWithPagination: React.FC<Props> = ({
  mediaData,
  loading,
  title,
  setNextPage,
  setMovieYear,
  resetFilter,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = Number(location.search.split('=')[1]) || 1;
  const lastPage = (mediaData?.total / 20).toFixed();

  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  const handleNextPage = async () => {
    setNextPage(nextPage);
    await navigate(`${location.pathname}?page=${nextPage}`, { replace: true });
  };

  const handlePrevPage = async () => {
    setNextPage(prevPage);
    await navigate(`${location.pathname}?page=${prevPage}`, { replace: true });
  };

  const handleYearChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMovieYear(Number(e.target.value));
    await navigate(`${location.pathname}?page=1`, { replace: true });
  };

  // Redirect to last page if current_page more then last_page(when manual tap in url)
  useEffect(() => {
    (async () => {
      if (mediaData?.current_page > mediaData?.last_page) {
        setNextPage(mediaData?.last_page);
        await navigate(`${location.pathname}?page=${mediaData?.last_page}`, {
          replace: true,
        });
      }
    })();
  }, [
    mediaData?.current_page,
    mediaData?.last_page,
    location.pathname,
    navigate,
    setNextPage,
  ]);

  useEffect(() => {
    return function cleanUp() {
      resetFilter();
    };
  }, [resetFilter]);

  const results: Movie[] = mediaData && mediaData.results;

  return (
    <>
      <Layout title={title} description='cinema online serials'>
        <MainBgImage />
        <main className='home'>
          {/* Slick Carousel */}
          <Carousel />
          <div className='container-filter'>
            <div className='pick-year'>
              <CustomSelect
                options={yearDataRange()}
                onChange={handleYearChange}
              />
            </div>
          </div>
          {loading && <ProgressBar loading={loading} />}
          <CinemaPagination
            prevLink={prevPage}
            nextLink={nextPage}
            lastPage={lastPage}
            currentPage={currentPage}
            prev={handlePrevPage}
            next={handleNextPage}>
            {/* <div className='wrapp-list-serials'>
              <h4 className='wrapp-list-serials--title'>Обновления сериалов</h4>
              <LastSerials />
            </div> */}
            <div className='movie-card--list'>
              {loading && <SkeletonLoader />}
              {!loading &&
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
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappContentWithPagination);
