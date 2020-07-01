import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

interface Props {
  height?: number;
  width?: number;
}

const useStyles = makeStyles(() => ({
    card: {
      backgroundColor: '#9dc5c3',
      backgroundImage: 'linear-gradient(to right top, #051937, #1a2759, #3c327a, #663998, #963ab0)',
    },
  }),
);

const AuthLoader: React.FC<Props> = ({ width = 280, height = 300 }) => {
  const classes = useStyles();
  return (
    <Skeleton
      variant='rect'
      height={height}
      width={width}
      animation='pulse'
      className={classes.card}
    />
  );
};

export default AuthLoader;