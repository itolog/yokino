import { gql } from 'apollo-boost';

export const GET_MOVIES_UPDATES = gql`
  query GetMoviesUpdates($next: String!) {
    getMoviesUpdates(next: $next) {
      total
      next_page
      prev_page
      results {
        title
        kinopoisk_id
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
  }
`;
