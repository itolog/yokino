import { gql } from 'apollo-boost';

export const CARTOON_SERIALS = gql`
  query Cartoon($page: Float!, $year: Float!) {
    cartoonSerials(page: $page, year: $year) {
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
