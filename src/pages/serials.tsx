import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';
import { GET_SERIALS_UPDATES } from '../shared/ggl/getSerialsUpdate';
import WithPageState from '../shared/hocs/WithPageState';
import { PageState } from '../shared/interface/page-state';

const Serials: React.FC<PageState> = ({ nextPage, movieYear }) => {
  const { loading, error, data } = useQuery(GET_SERIALS_UPDATES, {
    variables: {
      page: nextPage,
      year: movieYear,
    },
  });

  const movies = !loading && data.getSerialsUpdates;

  return (
    <WrappContentWithPagination
      error={error && error.message}
      mediaData={movies}
      loading={loading}
      title='serials'
    />
  );
};

export default WithPageState(Serials);
