import { gql } from 'apollo-boost';

export const GET_MOVIES_UPDATES = gql`
  query GetMoviesUpdates($page: String!, $year: String!) {
    getMoviesUpdates(page: $page, year: $year) {
      current_page
      last_page
      prev_page_url
      data {
        id
        kinopoisk_id
        imdb_id
        ru_title
        year
        iframe_src
        poster
        media {
          max_quality
          duration
        }
      }
    }
  }
`;
