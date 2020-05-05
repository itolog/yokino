import React, { memo } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useLocation, useNavigate } from '@reach/router';
import BannerHorisontal from '../shared/banners/BannerHorisontal/BannerHorisontal';
import CinemaPagination from '../shared/components/CinemaPagination/CinemaPagination';

import Layout from '../shared/Layout/Layout';

import Error from '../shared/components/Error/Error';
import MovieCard from '../shared/components/MovieCard/MovieCard';
import constants from '../shared/constants/constants';
import { Movie } from '../shared/generated/graphql';
import SkeletonLoader from '../shared/UI/SkeletonLoader/SkeletonLoader';

import '../shared/styles/indexPage.scss';

import '../shared/styles/collectionPage.scss';

import { GET_COLLECTIONS } from '../shared/ggl/getCollection';
import ProgressBar from '../shared/UI/ProgressBar/ProgressBar';

const Collection = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = Number(location?.search?.split('&')[ 0 ]?.split('=')[ 1 ]);
  const page = Number(location?.search?.split('&')[ 1 ]?.split('=')[ 1 ]) || 1;

  const { loading, error, data } = useQuery(GET_COLLECTIONS, {
    variables: {
      id,
      page,
    },
  });
  const lastPage = Math.ceil(data?.getCollections?.total / constants.MOVIE_PER_PAGE);
  const movies: Movie[] = data?.getCollections.results;

  const handleToPage = async (event: React.ChangeEvent<unknown>, value: number) => {
    await navigate(`${location.pathname}?id=${id}&page=${value}`, { replace: true });
  };

  if (error) return <Error error={error.message}/>;

  return (
    <Layout
      description='подборки'
      title='подборки'
    >
      <div className='home'>
        {/* BannerHorisontal */}
        <BannerHorisontal/>
        <CinemaPagination
          setPage={handleToPage}
          currentPage={page}
          lastPage={lastPage}
        >
          <div className='wrapp-collection'>
            <div className='collection-progress'>
              {loading && <ProgressBar loading={loading}/>}
            </div>
            {!movies && <SkeletonLoader/>}
            {movies &&
            movies.map((item: Movie, index: number) => {
              return (
                <MovieCard
                  key={item.id || index}
                  title={item.name}
                  poster={item.poster}
                  id={item.id}
                  imdb_id={item.imdb_id}
                  year={item.year}
                  iframe_src={item.iframe_url}
                  kinopoisk_rating={item.kinopoisk}
                  imdb_rating={item.imdb}
                  quality={item.quality}
                />
              );
            })}
          </div>
        </CinemaPagination>

      </div>
    </Layout>
  );
});

export default Collection;
