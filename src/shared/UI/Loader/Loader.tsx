import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const colorStart = '#f05';
const colorEnd = '#B001C2';

const useStyles = makeStyles(() => ({
    wrappLoader: {
      display: 'flex',
      alignItems: 'center',
      height: '100vh',
      justifyContent: 'center',
    },
    loader: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      height: '100px',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '5px',
        borderRadius: 5,
        background: colorStart,
        animation: '$border 1s ease-in-out infinite',
        animationDirection: 'alternate-reverse',
        animationFillMode: 'both',
      },
    },
    loaderItem: {
      color: 'white',
      fontSize: '3rem',
      fontWeight: 'bold',
      outline: 'none',
      borderRadius: '100%',
      margin: '2vw',
      textTransform: 'uppercase',
      animation: '$bounce 1s ease-in-out infinite',
      animationDirection: 'alternate-reverse',
      animationFillMode: 'both',
      '&:nth-child(1)': {
        animationDelay: '0s',
      },
      '&:nth-child(2)': {
        animationDelay: '.2s',
      },
      '&:nth-child(3)': {
        animationDelay: '.3s',
      },
      '&:nth-child(4)': {
        animationDelay: '.4s',
      },
      '&:nth-child(5)': {
        animationDelay: '.5s',
      },
    },
    '@keyframes border': {
      '0%': {
        transform: 'scale3d(0.8, 0.6, 0.3)',
        background: colorStart,
      },
      '100%': {
        background: colorEnd,
        transform: 'scale3d(1, 1, 1)',
      },
    },
    '@keyframes bounce': {
      '0%': {
        color: colorStart,
        transform: 'translateY(-20px)',
        filter: 'blur(0px)',
      },
      '10%': {
        filter: 'blur(1px)',
      },
      '100%': {
        color: colorEnd,
        transform: 'translateY(20px)',
        filter: 'blur(3px)',
      },
    },
  }))
;

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrappLoader}>
      <ul className={classes.loader}>
        <li className={classes.loaderItem}>y</li>
        <li className={classes.loaderItem}>o</li>
        <li className={classes.loaderItem}>k</li>
        <li className={classes.loaderItem}>i</li>
        <li className={classes.loaderItem}>n</li>
        <li className={classes.loaderItem}>o</li>
      </ul>
    </div>
  );
};

export default Loader;