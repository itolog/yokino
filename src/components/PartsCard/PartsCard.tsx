import React, {memo} from 'react';

import { Link } from 'gatsby';
import Skeleton from '@material-ui/lab/Skeleton';
import { useQuery } from '@apollo/react-hooks';

import { MovieInfo } from '../../shared/generated/graphql';
import { GET_MOVIE } from '../../shared/ggl/getMovie';
import LazyImg from './../../shared/components/LazyImg/LazyImg';

interface Props {
  id: number;
}

import useStyles from './styles'

const PartsCard: React.FC<Props> = memo(({ id }) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: {
      id,
    },
  });

  const movie: MovieInfo = data && data.movieInfo;

  if (error) return null;

  return (
    <Link
      to={`/video/?id=${id}`}
      className={classes.partsCard}
      aria-label='navigate to the video page'>
      {!loading && movie.poster ? (
        <div className={classes.wrappImage}>
          <span className={classes.year}>{movie.year}</span>
          <LazyImg
            src={movie.poster}
            width='160'
            height='220'
            alt={movie.name || 'poster'}
          />
        </div>
      ) : (
        <Skeleton
          className={classes.skeletCard}
          animation='pulse'
          variant='rect'
          width='160px'
          height='220px'
        />
      )}
      {!loading && movie.name ? (
        <h5 className={classes.title}>{movie.name}</h5>
      ) : (
        <Skeleton
          className={classes.skeletCard}
          animation='pulse'
          variant='rect'
          width='160px'
          height='20px'
        />
      )}
    </Link>
  );
});

export default PartsCard;
