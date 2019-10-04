import { gql } from 'apollo-boost';

export const LIST_FOR_CAROUSEL = gql`
    query ListForCarousel{
        listForCarousel {
            title
            kinopoisk_id
            material_data {
                poster_url
            }
        }
    }`;