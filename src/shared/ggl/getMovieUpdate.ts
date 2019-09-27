import { gql } from 'apollo-boost';

export const GET_MOVIES_UPDATES = gql`
  query GetMoviesUpdates(
    $next: String!
    $type: String!
    $year: String!
    $genres: String!
    $camrip: Boolean!
  ) {
    getMoviesUpdates(
      next: $next
      type: $type
      year: $year
      genres: $genres
      camrip: $camrip
    ) {
      total
      next_page
      prev_page
      results {
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
  }
`;
