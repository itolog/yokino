import { useLocation } from '@reach/router';
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import Error from '../shared/components/Error/Error';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';
import { GET_SERIALS_UPDATES } from '../shared/ggl/getSerialsUpdate';
import WithPageState from '../shared/hocs/WithPageState';
import { PageState } from '../shared/interface/page-state';

const Serials: React.FC<PageState> = ({ movieYear }) => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_SERIALS_UPDATES, {
    variables: {
      page: String(location.search.split('=')[1]) || '1',
      year: movieYear,
    },
  });


  if (error) return <Error error={error.message}/>;
  const movies = !loading && data.getSerialsUpdates;

  return (
    <WrappContentWithPagination
      mediaData={movies}
      loading={loading}
      title='serials'
    />
  );
};

export default WithPageState(Serials);
