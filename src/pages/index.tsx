import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';
import withPagination from '../shared/hocs/WithPagination';
import { Pagination } from '../shared/interface/pagination';

import Loader from '../shared/components/Loader/Loader';

import '../shared/styles/indexPage.scss';

import { GET_MOVIES_UPDATES } from '../shared/ggl/getMovieUpdate';

const Index: React.FC<Pagination> = ({ toNextPage, nextPage }) => {
  const { loading, error, data } = useQuery(GET_MOVIES_UPDATES, {
    variables: {
      next: nextPage,
    },
  });

  const movies = !loading && data.getMoviesUpdates;

  return (
    <WrappContentWithPagination
      error={error && error.message}
      mediaData={movies}
      loading={loading}
      toNextPage={toNextPage}
    />
  );
};

export default withPagination(Index);
