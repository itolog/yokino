import React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { useQuery } from '@apollo/react-hooks';

// Store import
import { AppState } from '../state/createStore';
import { Actions as paginationActions } from '../state/pagination/actions';
import { getNextPage } from '../state/pagination/selectors';

import CinemaPagination from '../shared/components/CinemaPagination/CinemaPagination';
import Error from '../shared/components/Error/Error';
import Layout from '../shared/components/Layout/Layout';
import Loader from '../shared/components/Loader/Loader';
import MovieCard from '../shared/components/MovieCard/MovieCard';
import SkeletonLoader from '../shared/components/SkeletonLoader/SkeletonLoader';

import { GET_SERIALS_UPDATES } from '../shared/ggl/getSerialsUpdate';

import '../shared/styles/indexPage.scss';

// STORE PROPS
const mapStateToProps = (state: AppState) => {
  return {
    nextPage: getNextPage(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNextPage: (payload: string) =>
    dispatch(paginationActions.setNextPage(payload)),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Serials: React.FC<Props> = ({ setNextPage, nextPage }) => {
  const { loading, error, data } = useQuery(GET_SERIALS_UPDATES, {
    variables: {
      next: nextPage,
    },
  });

  const movies = data.getSerialsUpdates;

  const handleNextPage = () => {
    setNextPage(movies.next_page);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    setNextPage(movies.prev_page);
    window.scrollTo(0, 0);
  };

  if (error) return <Error error={error.message} />;

  if (movies) {
    return (
      <>
        <Layout title='Serials' description='cinema online serials'>
          <main className='home'>
            <CinemaPagination
              prevLink={movies.prev_page}
              nextLink={movies.next_page}
              prev={handlePrevPage}
              next={handleNextPage}
            >
              {loading && <SkeletonLoader />}
              {!loading &&
                movies &&
                movies.results.map((item: any) => {
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
            </CinemaPagination>
          </main>
        </Layout>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Serials);
