import { gql } from 'apollo-boost';

export const LIST_FOR_CAROUSEL = gql`
  query ListForCarousel {
    listForCarousel {
      results {
        id
        name
        kinopoisk_id
        poster
      }
    }
  }
`;
