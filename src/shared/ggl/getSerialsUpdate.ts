import { gql } from 'apollo-boost';

export const GET_SERIALS_UPDATES = gql`
  query GetSerialsUpdates($next: String!, $genres: String!, $year: String!) {
    getSerialsUpdates(next: $next, genres: $genres, year: $year) {
      total
      next_page
      prev_page
      results {
        title
        kinopoisk_id
        quality
        last_season
        last_episode
        episodes_count
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
