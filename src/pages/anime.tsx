import React, { memo } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useLocation } from '@reach/router';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';

import Error from '../shared/components/Error/Error';
import { Movies } from '../shared/generated/graphql';
import WithPageState from '../shared/hocs/WithPageState';
import { PageState } from '../shared/interface/page-state';

import { ANIME } from '../shared/ggl/anime';

const Anime: React.FC<PageState> = memo(({ movieYear, movieGenres }) => {
  const location = useLocation();

  const currentPage = Number(location.search.split('=')[ 1 ]);

  const { loading, error, data } = useQuery(ANIME, {
    variables: {
      page: currentPage || 1,
      year: movieYear,
      genre_id: movieGenres,
    },
  });

  const movies: Movies = data?.anime;

  if (error) return <Error error={error.message}/>;

  return (
    <WrappContentWithPagination
      mediaData={movies}
      loading={loading}
      title='yokino'
    />
  );
});

export default WithPageState(Anime);
