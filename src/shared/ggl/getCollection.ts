import { gql } from 'apollo-boost';

export const GET_COLLECTIONS = gql`
    query Collections($page: Float!, $id: Float!) {
        getCollections(id: $id, page: $page) {
            total
            prev_page
            next_page
            results{
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
