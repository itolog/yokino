import { useQuery } from '@apollo/react-hooks';
import { Link } from 'gatsby';
import React, { useState } from 'react';

import Error from '../shared/components/Error/Error';
import Layout from '../shared/components/Layout/Layout';
import MovieCard from '../shared/components/MovieCard/MovieCard';
import Loader from '../shared/UI/Loader/Loader';

import { SEARCH_MOVIES } from '../shared/ggl/searchMovie';

import '../shared/styles/searchPage.scss';

interface Props {
  location: Location;
}

const Search: React.FC<Props> = ({ location }) => {
  const [tabsState, setTabsState] = useState<string>('movies');

  const query = decodeURIComponent(location.search.split('=')[1]);
  const { loading, error, data } = useQuery(SEARCH_MOVIES, {
    variables: { title: query },
  });
  const movies = data && data.searchMedia;

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

  const setMovieVisible = () => {
    setTabsState('movies');
  };
  const setSerialsVisible = () => {
    setTabsState('serials');
  };

  return (
    <Layout title='поиск'>
      <h1 className='search-title'>
        Найдено совпадений : { movies.movies.length + movies.serials.length}
      </h1>

      <div className='search-tabs'>
        <button className={`serach-tabs--btn ${tabsState === 'movies' ? 'active-tab': ''}`} onClick={setMovieVisible}>
          <span className='search-tabs--count'>{movies.movies.length}</span>
         <span>фильмы</span>
        </button>
        <button className={`serach-tabs--btn ${tabsState === 'serials' ? 'active-tab': ''}`} onClick={setSerialsVisible}>
          <span className='search-tabs--count'>{movies.serials.length}</span>
          <span>сериалы</span>
        </button>
      </div>

      {/* Movies */}
      {tabsState === 'movies' && (
        <div className='search'>
          {movies &&
            movies.movies.map((item: any) => {
              return (
                <MovieCard
                  key={item.id}
                  title={item.ru_title}
                  poster={`https://st.kp.yandex.net/images/film_iphone/iphone360_${item.kinopoisk_id}.jpg`}
                  kinopoisk_id={item.kinopoisk_id}
                  year={item.year}
                />
              );
            })}
        </div>
      )}
      {/* SERIALS */}
      {tabsState === 'serials' && (
        <div className='search'>
          {movies &&
            movies.serials.map((item: any) => {
              return (
                <MovieCard
                  key={item.id}
                  title={item.ru_title}
                  poster={`https://st.kp.yandex.net/images/film_iphone/iphone360_${item.kinopoisk_id}.jpg`}
                  kinopoisk_id={item.kinopoisk_id}
                  year={item.start_date}
                />
              );
            })}
        </div>
      )}
    </Layout>
  );
};

export default Search;
