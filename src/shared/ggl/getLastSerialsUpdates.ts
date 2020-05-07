import { gql } from 'apollo-boost';

export const LIST_FOR_SERIALS_UPDATES = gql`
    query Update {
        lastUpdate {
            items {
                id
                name
                season
                episode
                availability
                iframe_url
            }
        }
    }
`;
