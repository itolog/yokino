import { gql } from 'apollo-boost';

export const GET_MOVIE = gql`
  query GetMovie($id: Float!) {
    getMovie(id: $id) {
      title_ru
      title_en
      duration {
        human
      }
      year
      kinopoisk_id
      token
      iframe_url
      trailer_token
      translator
      added_at
      material_data {
        updated_at
        tagline
        description
        countries
        genres
        actors
        directors
        studios
        kinopoisk_rating
        imdb_rating
        poster
      }
    }
  }
`;
