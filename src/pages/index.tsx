import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import Layout from '../shared/components/Layout/Layout';
import MovieCard from '../shared/components/MovieCard/MovieCard';
import Pagination from '../shared/components/Pagination/Pagination';
import SkeletonLoader from '../shared/components/SkeletonLoader/SkeletonLoader';
import { GET_MOVIES_UPDATES } from '../shared/ggl/getMovieUpdate';

import '../shared/styles/indexPage.scss';

const Index: React.FC = ({ location }: any) => {
  const page = location.search.split('=')[1];
  const pageNumper = Number(page) || 1;
  const { loading, error, data } = useQuery(GET_MOVIES_UPDATES, {
    variables: {
      page: pageNumper,
    },
  });

  if (error) return <p> `Error! ${error.message}`</p>;

  const movies = data.getMoviesUpdates;
  return (
    <>
      <Layout title='Yokino' description='cinema online'>
        <main className='home'>
          {loading && <SkeletonLoader />}

          {movies && movies.updates.length === 0 && (
            <div className='no-data'>
              <p>Список фильмов пуст</p>
            </div>
          )}

          {!loading &&
            movies &&
            movies.updates.map((item: any) => {
              return (
                <MovieCard
                  key={item.title_ru}
                  title={item.title_ru}
                  poster={item.material_data.poster}
                  material_data={item.material_data}
                  imdb_rating={item.material_data.imdb_rating}
                  kinopoisk_id={item.kinopoisk_id}
                  kinopoisk_rating={item.material_data.kinopoisk_rating}
                />
              );
            })}
        </main>
        {movies && (
          <Pagination
            current_page={movies.current_page}
            dataCount={movies.updates.length}
          />
        )}
      </Layout>
    </>
  );
};

export default Index;
