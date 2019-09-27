import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';
import withPagination from '../shared/hocs/WithPagination';
import { Pagination } from '../shared/interface/pagination';

import { GET_SERIALS_UPDATES } from '../shared/ggl/getSerialsUpdate';

const Serials: React.FC<Pagination> = ({ toNextPage, nextPage }) => {
  const { loading, error, data } = useQuery(GET_SERIALS_UPDATES, {
    variables: {
      next: nextPage,
      genres: '',
      year: '',
    },
  });

  const movies = !loading && data.getSerialsUpdates;

  return (
    <WrappContentWithPagination
      error={error && error.message}
      mediaData={movies}
      loading={loading}
      toNextPage={toNextPage}
    />
  );
};

export default withPagination(Serials);
