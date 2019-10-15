import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
    mutation createUser($input: UserInput!) {
        createUser(data: $input) {
            name
            password
        }
    }
`;
