import { gql } from 'apollo-boost';

export const GET_MOVIES_UPDATES = gql`
  query GetMoviesUpdates($page: Float!) {
    getMoviesUpdates(page: $page) {
      current_page
      updates {
        title_ru
        kinopoisk_id
        material_data {
          description
          poster
          imdb_rating
          kinopoisk_rating
          genres
          year
        }
      }
    }
  }
`;
