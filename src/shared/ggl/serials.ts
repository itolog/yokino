import { gql } from 'apollo-boost';

export const SERIALS = gql`
  query Serials($page: Float!, $year: Float!) {
    serials(page: $page, year: $year) {
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
        seasons {
          season
          episodes {
            episode
          }
        }
      }
    }
  }
`;
