import { gql } from 'apollo-boost';

export const GET_MOVIE = gql`
  query GetMovie($id: String!) {
    getMovie(id: $id) {
      title
      orig_title
      kp_id
      type
      add
      year
      seasons_count
      episodes_count
      iframe_src
      media_info {
        description
        poster_url
        backdrop_path
        countries
        genres {
          id
          name
        }
        rating
      }
    }
  }
`;
