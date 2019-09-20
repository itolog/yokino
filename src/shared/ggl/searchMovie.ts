import { gql } from 'apollo-boost';

export const SEARCH_MOVIES = gql`
  query SearchMovies($title: String!) {
    searchMovie(title: $title) {
      title
      kinopoisk_id
      quality
      material_data {
        description
        poster_url
        imdb_rating
        kinopoisk_rating
        genres
        year
      }
    }
  }
`;
