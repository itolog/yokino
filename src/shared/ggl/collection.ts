import { gql } from 'apollo-boost';

export const COLLECTION = gql`
  query Collection {
    collection {
      id
      name
    }
  }
`;
