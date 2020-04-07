import { gql } from 'apollo-boost';

export const MOVIES = gql`
  query Movies($page: Float!, $year: Float!) {
    movies(page: $page, year: $year) {
      total
      prev_page
      next_page
      results {
        id
        name
        imdb_id
        kinopoisk_id
        iframe_url
        year
        quality
        imdb
        kinopoisk
        poster
      }
    }
  }
`;
