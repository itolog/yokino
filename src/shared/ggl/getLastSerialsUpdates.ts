import { gql } from 'apollo-boost';

export const LIST_FOR_SERIALS_UPDATES = gql`
    query ListForSerialsUpdate{
        listForSerialsUpdate{
            title
            last_episode
            last_season
            kinopoisk_id
            material_data{
                poster_url
            }
        }
    }`;