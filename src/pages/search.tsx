import React, { memo } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useLocation } from '@reach/router';
import BannerHorisontal from '../shared/banners/BannerHorisontal/BannerHorisontal';

import MainBgImage from '../shared/components/MainBgImage/MainBgImage';

import Error from '../shared/components/Error/Error';
import MovieCard from '../shared/components/MovieCard/MovieCard';
import { Movie } from '../shared/generated/graphql';
import Layout from '../shared/Layout/Layout';
import Loader from '../shared/UI/Loader/Loader';

import { SEARCH_MOVIES } from '../shared/ggl/searchMovie';

import useStyles from '../shared/styles/searchPage';

const Search = memo(() => {
  const classes = useStyles();

  const location = useLocation();
  const query = decodeURIComponent(location.search.split('=')[1]);
  const { loading, error, data } = useQuery(SEARCH_MOVIES, {
    variables: { title: query },
  });

  if (error) return <Error error={error.message} />;
  const movies: Movie[] = data && data.search.results;

  if (loading)
    return ( <Loader />);

  return (
    <Layout title='поиск'>
      <MainBgImage />
      <main className='home'>
        <h1 className={classes.searchTitle}>Найдено совпадений : {movies.length}</h1>

        <div className={classes.search}>
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
        {/* BannerHorisontal */}
        <BannerHorisontal/>
      </main>
    </Layout>
  );
});

export default Search;
