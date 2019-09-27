import React from 'react';
import { connect } from 'react-redux';

import { useQuery } from '@apollo/react-hooks';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';

import '../shared/styles/indexPage.scss';

import { GET_MOVIES_UPDATES } from '../shared/ggl/getMovieUpdate';

// Store import
import { AppState } from '../state/createStore';
// Filter state
import {
  getMovieCamripState,
  getMovieGenresState,
  getMovieYearState,
} from '../state/movie-filter/selectors';
import { getNextPage } from '../state/pagination/selectors';

const mapStateToProps = (state: AppState) => {
  return {
    nextPage: getNextPage(state),
    // filter state
    movieYear: getMovieYearState(state),
    movieGenres: getMovieGenresState(state),
    movieIsCamrip: getMovieCamripState(state),
  };
};

type Props = ReturnType<typeof mapStateToProps>;

const Index: React.FC<Props> = ({
  nextPage,
  movieYear,
  movieIsCamrip,
  movieGenres,
}) => {
  const { loading, error, data } = useQuery(GET_MOVIES_UPDATES, {
    variables: {
      next: nextPage,
      type: '',
      year: movieYear,
      genres: movieGenres,
      camrip: movieIsCamrip,
    },
  });

  const movies = !loading && data.getMoviesUpdates;

  return (
    <>
      <WrappContentWithPagination
        error={error && error.message}
        mediaData={movies}
        loading={loading}
        title='yokino'
      />
    </>
  );
};

export default connect(mapStateToProps)(Index);
