import React, { memo } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useLocation } from '@reach/router';

import MainBgImage from '../shared/components/MainBgImage/MainBgImage';

import Error from '../shared/components/Error/Error';
import Layout from '../shared/components/Layout/Layout';
import MovieCard from '../shared/components/MovieCard/MovieCard';
import { Movie } from '../shared/generated/graphql';
import Loader from '../shared/UI/Loader/Loader';

import { SEARCH_MOVIES } from '../shared/ggl/searchMovie';

import '../shared/styles/searchPage.scss';

const Search = memo(() => {
  const location = useLocation();
  const query = decodeURIComponent(location.search.split('=')[1]);
  const { loading, error, data } = useQuery(SEARCH_MOVIES, {
    variables: { title: query },
  });

  if (error) return <Error error={error.message} />;
  const movies: Movie[] = data && data.search.results;

  if (loading)
    return (
      <div className='wrapp-loader'>
        <Loader />
      </div>
    );

  // if (!!!movies.length)
  //   return (
  //     <div className='no-results'>
  //       <Link className='to-main' to='/'>
  //         на главную
  //       </Link>
  //       <p className='no-results--text'>
  //         По запросу "{query}" ничего не найдено
  //       </p>
  //     </div>
  //   );

  return (
    <Layout title='поиск'>
      <MainBgImage />
      <main className='home'>
        <h1 className='search-title'>Найдено совпадений : {movies.length}</h1>

        <div className='search'>
          {movies &&
            movies.map((item: Movie, index: number) => {
              return (
                <MovieCard
                  key={item.id || index}
                  title={item.name}
                  poster={item.poster}
                  kinopoisk_rating={item.kinopoisk}
                  quality={item.quality}
                  imdb_rating={item.imdb}
                  id={item.id}
                  year={item.year}
                />
              );
            })}
        </div>
      </main>
    </Layout>
  );
});

export default Search;
