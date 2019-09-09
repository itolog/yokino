import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import PlayButton from '../../../assets/img/play-button.svg';
import LazyImg from '../LazyImg/LazyImg';

import IsEmpty from '../IsEmpty/IsEmpty';

import './movieCard.scss';

interface Props {
  imdb_rating: number;
  kinopoisk_rating: number;
  material_data: any;
  poster: string;
  title: string;
  kinopoisk_id: string;
}

const MovieCard: React.FC<Props> = ({
  imdb_rating,
  kinopoisk_rating,
  material_data,
  poster,
  title,
  kinopoisk_id,
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

  const genres = (val: string[]) => {
    if (val === null) return;
    return val.map(genre => (
      <div key={genre} className="ratelabel genres">
        {genre}
      </div>
    ));
  };

  return (
    <div className="movie-card">
      {/* INFO BLOCK */}
      <div className="info">
        <IsEmpty val={imdb_rating}>
          <h5 className="rating">
            IMDb :<span className="rating--imdb"> {imdb_rating}</span>
          </h5>
        </IsEmpty>
        <IsEmpty val={kinopoisk_rating}>
          <h5 className="rating">
            КиноПоиск :
            <span className="rating--kinopoisk">{kinopoisk_rating}</span>
          </h5>
        </IsEmpty>
        <Link to={`/video/?id=${kinopoisk_id}`} className="play-link">
          <PlayButton />
        </Link>

        <IsEmpty val={material_data.year}>
          <div className="ratelabel">{material_data.year}</div>
        </IsEmpty>
        {genres(material_data.genres)}
      </div>
      {/* POSTER */}
      {poster ? (
        <LazyImg src={poster} alt={title} />
      ) : (
        <Img fluid={data.file.childImageSharp.fluid} alt="no poster" />
      )}

      <h4 className="card-title">{title}</h4>
    </div>
  );
};

export default MovieCard;
