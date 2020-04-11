import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React, { memo } from 'react';

import PlayButton from '../../../assets/img/play-button.svg';
import LazyImg from '../LazyImg/LazyImg';

import IsEmpty from '../IsEmpty/IsEmpty';

import './movieCard.scss';

interface Props {
  id?: number | null;
  imdb_rating?: string | null;
  kinopoisk_rating?: string | null;
  poster?: string | null;
  title?: string | null;
  kinopoisk_id?: string | null;
  imdb_id?: string | null;
  quality?: string | null;
  last_season?: number | null;
  last_episode?: number | null;
  year?: string | number | null;
  iframe_src?: string | null;
}

const MovieCard: React.FC<Props> = memo(
  ({
    year,
    poster,
    title,
    last_season,
    last_episode,
    imdb_rating,
    kinopoisk_rating,
    quality,
    id,
  }) => {
    const data = useStaticQuery(graphql`
      query {
        file(relativePath: { eq: "Poster_Not_Available2.jpg" }) {
          childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    `);

    return (
      <div className='layout-movie-card'>
        <div className='movie-card'>
          {/* INFO BLOCK */}
          <div className='info'>
            <IsEmpty val={imdb_rating}>
              <h5 className='rating'>
                IMDb : <span className='rating--imdb'>{imdb_rating}</span>
              </h5>
            </IsEmpty>
            <IsEmpty val={kinopoisk_rating}>
              <h5 className='rating'>
                КиноПоиск :{' '}
                <span className='rating--kinopoisk'>{kinopoisk_rating}</span>
              </h5>
            </IsEmpty>
            <Link
              to={`/video/?id=${id}`}
              aria-label='navigate to the video page'
              className='play-link'>
              <PlayButton />
            </Link>

            <IsEmpty val={year}>
              <div className='ratelabel ratelabel__year'>{year}</div>
            </IsEmpty>
            {/* <div className='wrapp-genres'>{genres(genres)}</div> */}
          </div>
          {/* POSTER */}
          <div className='poster-wrapp'>
            {poster ? (
              <LazyImg
                src={poster}
                width='200'
                height='300'
                alt={title || 'poster'}
              />
            ) : (
              <Img fluid={data.file.childImageSharp.fluid} alt='no poster' />
            )}
          </div>

          <h6 className='card-quality'>{quality}</h6>
          {last_season && last_episode && (
            <h5 className='card-season'>
              сезон {last_season} епизод {last_episode}
            </h5>
          )}
        </div>
        <h4 className='card-title'>{title}</h4>
      </div>
    );
  },
);

export default MovieCard;
