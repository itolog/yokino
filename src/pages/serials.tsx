import { useLocation } from '@reach/router';
import React, { memo } from 'react';

import { useQuery } from '@apollo/react-hooks';
import Error from '../shared/components/Error/Error';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';
import { SERIALS } from '../shared/ggl/serials';
import WithPageState from '../shared/hocs/WithPageState';
import { PageState } from '../shared/interface/page-state';

const Serials: React.FC<PageState> = memo(({ movieYear, movieGenres }) => {
  const location = useLocation();

  const currentPage = Number(location.search.split('=')[1]);

  const { loading, error, data } = useQuery(SERIALS, {
    variables: {
      page: currentPage || 1,
      year: movieYear,
      genre_id: movieGenres,
    },
  });

  if (error) return <Error error={error.message} />;
  const movies = data && data.serials;

  return (
    <WrappContentWithPagination
      mediaData={movies}
      loading={loading}
      title='serials'
    />
  );
});

export default WithPageState(Serials);
