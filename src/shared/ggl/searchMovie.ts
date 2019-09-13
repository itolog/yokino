import { gql } from 'apollo-boost';

export const SEARCH_MOVIES = gql`
  query SearchMovies($title: String!) {
    searchMovie(title: $title) {
      title_ru
      title_en
      duration {
        seconds
        human
      }
      kinopoisk_id
      token
      iframe_url
      trailer_token
      trailer_iframe_url
      translator
      added_at
      material_data {
        year
        updated_at
        tagline
        description
        age
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
