import { gql } from 'apollo-boost';

export const NOW_PLAYING = gql`
    query NowPlaying{
        nowPlaying{
            backdrop_path
        }
    }`;