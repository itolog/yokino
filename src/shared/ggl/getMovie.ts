import { gql } from 'apollo-boost';

export const GET_MOVIE = gql`
  query GetMovie($id: String!) {
    getMovie(id: $id) {
      id
      title
      title_orig
      link
      translation {
        id
        title
      }
      kinopoisk_id
      quality
      created_at
      updated_at
      material_data {
        title
        title_en
        year
        tagline
        description
        poster_url
        duration
        countries
        genres
        kinopoisk_rating
        imdb_rating
        premiere_world
        actors
        producers
      }
    }
  }
`;
