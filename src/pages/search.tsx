import { useQuery } from '@apollo/react-hooks';
import { Link } from 'gatsby';
import React from 'react';

import Error from '../shared/components/Error/Error';
import Layout from '../shared/components/Layout/Layout';
import Loader from '../shared/components/Loader/Loader';
import MovieCard from '../shared/components/MovieCard/MovieCard';

import { SEARCH_MOVIES } from '../shared/ggl/searchMovie';

import '../shared/styles/searchPage.scss';

interface Props {
  location: Location;
}

const Search: React.FC<Props> = ({ location }) => {
  const query = location.search.split('=')[1];
  const { loading, error, data } = useQuery(SEARCH_MOVIES, {
    variables: { title: query },
  });

  if (loading) return <Loader />;
  if (!data)
    return (
      <div className='no-results'>
        <Link className='to-main' to='/'>
          на главную
        </Link>
        <p className='no-results--text'>Нет совпадений</p>
      </div>
    );
  if (error) return <Error error={error.message} />;
  const movies = data.searchMovie;
  return (
    <Layout title='поиск'>
      <h1 className='search-title'>Найдено совпадений : {movies.length}</h1>
      <div className='search'>
        {movies &&
          movies.map((item: any) => {
            return (
              <MovieCard
                key={item.kinopoisk_id}
                title={item.title}
                poster={item.material_data.poster_url}
                quality={item.quality}
                material_data={item.material_data}
                imdb_rating={item.material_data.imdb_rating}
                kinopoisk_id={item.kinopoisk_id}
                kinopoisk_rating={item.material_data.kinopoisk_rating}
              />
            );
          })}
      </div>
    </Layout>
  );
};

export default Search;
