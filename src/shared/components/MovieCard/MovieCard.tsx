import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import PlayButton from '../../../assets/img/play-button.svg';
import LazyImg from '../LazyImg/LazyImg';

import IsEmpty from '../IsEmpty/IsEmpty';

import './movieCard.scss';

interface Props {
  imdb_rating?: number;
  kinopoisk_rating?: number;
  material_data?: any;
  poster: string;
  title: string;
  kinopoisk_id: string | null;
  imdb_id?: string | null;
  quality?: string;
  last_season?: number;
  last_episode?: number;
  year?: string;
  iframe_src?: string;
}

const MovieCard: React.FC<Props> = ({
  year,
  poster,
  title,
  kinopoisk_id,
  last_season,
  last_episode,
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

  // const genres = (val: string[]) => {
  //   if (val === null) return;
  //   return val.map(genre => (
  //     <div key={genre} className='ratelabel genres'>
  //       {genre}
  //     </div>
  //   ));
  // };

  return (
    <div className='movie-card'>
      {/* INFO BLOCK */}
      <div className='info'>
        {/* <IsEmpty val={imdb_rating}>
          <h5 className='rating'>
            IMDb :{' '}
            <span className='rating--imdb'>
              {Number(imdb_rating).toFixed(1)}
            </span>
          </h5>
        </IsEmpty>
        <IsEmpty val={kinopoisk_rating}>
          <h5 className='rating'>
            КиноПоиск :{' '}
            <span className='rating--kinopoisk'>
              {Number(kinopoisk_rating).toFixed(1)}
            </span>
          </h5>
        </IsEmpty> */}
        <Link
          to={`/video/?id=${kinopoisk_id}`}
          aria-label='navigate to the video page'
          className='play-link'
        >
          <PlayButton />
        </Link>

        <IsEmpty val={year}>
          <div className='ratelabel ratelabel__year'>{year?.split(' ')[0]}</div>
        </IsEmpty>
        {/* <div className='wrapp-genres'>{genres(genres)}</div> */}
      </div>
      {/* POSTER */}
      <div className='poster-wrapp'>
        {poster ? (
          <LazyImg src={poster} alt={title} />
        ) : (
          <Img fluid={data.file.childImageSharp.fluid} alt='no poster' />
        )}
      </div>
      <h4 className='card-title'>{title}</h4>
      {/* <h6 className='card-quality'>{quality}</h6> */}
      {last_season && last_episode && (
        <h5 className='card-season'>
          сезон {last_season} епизод {last_episode}
        </h5>
      )}
    </div>
  );
};

export default MovieCard;
