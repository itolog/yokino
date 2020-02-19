import { gql } from 'apollo-boost';

export const LIST_FOR_CAROUSEL = gql`
    query ListForCarousel($page: String!, $year: String!) {
        listForCarousel(page: $page, year: $year) {
            data {
                id
                title
                kp_id
                poster
            }
        }
    }
`;
