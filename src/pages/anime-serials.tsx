import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useLocation } from '@reach/router';

import WrappContentWithPagination from '../shared/components/WrappContentWithPagination/WrappContentWithPagination';

import Error from '../shared/components/Error/Error';
import { Movies } from '../shared/generated/graphql';
import WithPageState from '../shared/hocs/WithPageState';
import { PageState } from '../shared/interface/page-state';

import '../shared/styles/indexPage.scss';

import { ANIME_SERIALS } from '../shared/ggl/animeSerials';

const AnimeSerials: React.FC<PageState> = ({ movieYear }) => {
  const location = useLocation();

  const currentPage = Number(location.search.split('=')[1]);

  const { loading, error, data } = useQuery(ANIME_SERIALS, {
    variables: {
      page: currentPage || 1,
      year: Number(movieYear),
    },
  });

  const movies: Movies = data?.animeSerials;

  if (error) return <Error error={error.message} />;

  return (
    <>
      <WrappContentWithPagination
        mediaData={movies}
        loading={loading}
        title='yokino'
      />
    </>
  );
};

export default WithPageState(AnimeSerials);
