import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  skeletorCard: {
    height: '300px',
    width: '200px',
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
    borderRadius: '10px'
  },
}));

export default function SkeletonLoader() {
  const classes = useStyles();
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {
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
}
