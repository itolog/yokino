import { gql } from 'apollo-boost';

export const CARTOON = gql`
  query Cartoon($page: Float!, $year: Float!) {
    cartoon(page: $page, year: $year) {
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
