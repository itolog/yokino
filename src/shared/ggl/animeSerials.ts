import { gql } from 'apollo-boost';

export const ANIME_SERIALS = gql`
  query AnimeSerials($page: Float!, $year: Float!) {
    animeSerials(page: $page, year: $year) {
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
      }
    }
  }
`;
