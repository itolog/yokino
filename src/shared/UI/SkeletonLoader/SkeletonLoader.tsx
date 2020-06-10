import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Skeleton from '@material-ui/lab/Skeleton';

interface Props {
  count?: number;
}

const useStyles = makeStyles(theme => ({
  skeletorCard: {
    height: '300px',
    border: '2px solid #17a59e',
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '2px',
    [theme.breakpoints.down('sm')]: {
      margin: '5% 0',
    },
  },
  card: {
    background: '#392448',
    borderRadius: '10px',
  },
}));

const SkeletonLoader: React.FC<Props> = ({ count = 10 }) => {
  const classes = useStyles();
  const range = [...Array(count).keys()];

  return (
    <>
      {range.map((item: number) => {
        return (
          <div key={item} className={classes.skeletorCard}>
            <Skeleton
              variant='rect'
              height={300}
              width={200}
              animation='pulse'
              className={classes.card}
            />
          </div>
        );
      })}
    </>
  );
};

export default SkeletonLoader;
