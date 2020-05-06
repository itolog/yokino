import React, { useState } from 'react';

import { Redirect } from '@reach/router';

import { useQuery } from '@apollo/react-hooks';

import { MovieInfo } from '../../shared/generated/graphql';
import { GET_MOVIE } from '../../shared/ggl/getMovie';

import { makeStyles, Theme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import LazyImg from './../../shared/components/LazyImg/LazyImg';

interface Props {
  id: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  partsCard: {
    width: '160px',
    color: 'white',
    cursor: 'pointer',
    margin: '3%',
    '&:hover': {
      opacity: 0.7,
    },
    [theme.breakpoints.down(769)]: {
      margin: '0 0 3% 0',
    },
  },
  title: {
    textAlign: 'center',
  },
  skeletCard: {
    background: '#392448',
  },
}));

const PartsCard: React.FC<Props> = ({ id }) => {
  const classes = useStyles();

  const [isRedirect, setIsRedirect] = useState(false);

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: {
      id,
    },
  });

  const movie: MovieInfo = data && data.movieInfo;

  const navigateToNextPart = () => {
    setIsRedirect(true);
  };

  if (isRedirect) return <Redirect to={`/video/?id=${id}`} />;

  return (
    <div
      onClick={navigateToNextPart}
      className={classes.partsCard}
      aria-label='navigate to the video page'>
      {!loading && movie.poster ? (
        <LazyImg
          src={movie.poster}
          width='160'
          height='220'
          alt={movie.name || 'poster'}
        />
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
    </div>
  );
};

export default PartsCard;
