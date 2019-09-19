import React, { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';

import CinemaPagination from '../shared/components/CinemaPagination/CinemaPagination';
import Error from '../shared/components/Error/Error';
import Layout from '../shared/components/Layout/Layout';
import Loader from '../shared/components/Loader/Loader';
import MovieCard from '../shared/components/MovieCard/MovieCard';
import SkeletonLoader from '../shared/components/SkeletonLoader/SkeletonLoader';

import { GET_MOVIES_UPDATES } from '../shared/ggl/getMovieUpdate';

import '../shared/styles/indexPage.scss';

interface Props {}

const Index: React.FC<Props> = () => {
  const [pageNext, setPageNext] = useState<string>('');

  const { loading, error, data } = useQuery(GET_MOVIES_UPDATES, {
    variables: {
      next: pageNext,
    },
  });

  if (error) return <Error error={error.message} />;

  const movies = data.getMoviesUpdates;

  const handleNextPage = () => {
    setPageNext(movies.next_page);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    setPageNext(movies.prev_page);
    window.scrollTo(0, 0);
  };

  if (movies) {
    return (
      <>
        <Layout title='Yokino' description='cinema online'>
          <main className='home'>
            <CinemaPagination
              prevLink={movies.prev_page}
              nextLink={movies.next_page}
              prev={handlePrevPage}
              next={handleNextPage}
            >
              {loading && <SkeletonLoader />}
              {!loading &&
                movies &&
                movies.results.map((item: any) => {
                  return (
                    <MovieCard
                      key={item.kinopoisk_id}
                      title={item.title}
                      poster={item.material_data.poster_url}
                      material_data={item.material_data}
                      imdb_rating={item.material_data.imdb_rating}
                      kinopoisk_id={item.kinopoisk_id}
                      kinopoisk_rating={item.material_data.kinopoisk_rating}
                    />
                  );
                })}
            </CinemaPagination>
          </main>
        </Layout>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default Index;
