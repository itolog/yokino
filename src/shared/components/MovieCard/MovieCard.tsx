import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React, { memo } from 'react';

import LazyImg from '../LazyImg/LazyImg';

import IsEmpty from '../IsEmpty/IsEmpty';

import useStyles from './styles';

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
  ({ year, poster, title, imdb_rating, kinopoisk_rating, quality, id }) => {
    const classes = useStyles();
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
      <div className={classes.layoutMovieCard}>
        <div className={classes.movieCard}>
          {/* INFO BLOCK */}
          <Link
            to={`/video/?id=${id}`}
            state={{ id }}
            aria-label='navigate to the video page'>
            <div className={classes.info}>
              <div className={classes.infoHeader}>
                <IsEmpty val={quality}>
                  <h6 className={classes.cardQuality}>{quality}</h6>
                </IsEmpty>

                <IsEmpty val={year}>
                  <div
                    className={`${classes.ratelabel} ${classes.ratelabelYear}`}>
                    {year}
                  </div>
                </IsEmpty>
              </div>
              <div>
                <div className={classes.raitContainer}>
                  <IsEmpty val={imdb_rating}>
                    <h5 className={`${classes.rating} ${classes.ratingImdb}`}>
                      IMDb : <span>{imdb_rating}</span>
                    </h5>
                  </IsEmpty>
                  <IsEmpty val={kinopoisk_rating}>
                    <h5
                      className={`${classes.rating} ${classes.ratingKinopoisk}`}>
                      KP : <span>{kinopoisk_rating}</span>
                    </h5>
                  </IsEmpty>
                </div>

                {/* <div className='wrapp-genres'>{genres(genres)}</div> */}
                <h4 className={classes.cardTitle}>{title}</h4>
              </div>
            </div>
          </Link>
          {/* POSTER */}
          <div className={classes.posterWrapp}>
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
        </div>
      </div>
    );
  },
);

export default MovieCard;
