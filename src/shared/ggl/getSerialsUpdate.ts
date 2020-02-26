import { gql } from 'apollo-boost';

export const GET_SERIALS_UPDATES = gql`
    query GetSerialsUpdates($page: String!, $year: String!) {
        getSerialsUpdates(page: $page, year: $year) {
            current_page
            last_page
            prev_page_url
            data {
                id
                kinopoisk_id
                iframe_src
                imdb_id
                ru_title
                start_date
                season_count
                episode_count
                poster
            }
        }
    }
`;
