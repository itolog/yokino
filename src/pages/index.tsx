import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';

import Error from '../shared/components/Error/Error';
import WithPageState from '../shared/hocs/WithPageState';
import { PageState } from '../shared/interface/page-state';

import '../shared/styles/indexPage.scss';

import { GET_MOVIES_UPDATES } from '../shared/ggl/getMovieUpdate';

const Index: React.FC<PageState> = ({
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

  if (error) return <Error error={error.message} />;

  const movies = !loading && data.getMoviesUpdates;

  return (
    <>
      <WrappContentWithPagination
        error={error && error!.message}
        mediaData={movies}
        loading={loading}
        title='yokino'
      />
    </>
  );
};

export default WithPageState(Index);
