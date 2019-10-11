import { gql } from 'apollo-boost';

export const LOGIN = gql`
  query Login($pass: String!, $name: String!) {
    login(pass: $pass, username: $name) {
      name
      email
      role
      banned
      access_token
    }
  }
`;
