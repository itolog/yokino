import { gql } from 'apollo-boost';

export const ANIME = gql`
  query Anime($page: Float!, $year: Float!) {
    anime(page: $page, year: $year) {
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
