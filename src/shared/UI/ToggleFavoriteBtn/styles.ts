import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  addToFavoriteBtn: {
    height: '50px',
    width: '80px',
    border: 'none',
    background: 'rgba(0, 0, 0, 0)',
    cursor: 'pointer',
    transition: '0.5s',
    outline: 'none',
    '&:hover': {
      animation: '$addHeart 0.5s linear',
      animationIterationCount: '2',
      animationDirection: 'reverse',
    },

    '&:active': { position: 'relative', top: '1px' },
  },


  '@keyframes addHeart': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1)' },
    '30%': { transform: 'scale(0.8)' },
    '50%': { transform: 'scale(0.7)' },
    '70%': { transform: 'scale(0.8)' },
    '100%': { transform: 'scale(1)' },
  },
}));

export default useStyles;
