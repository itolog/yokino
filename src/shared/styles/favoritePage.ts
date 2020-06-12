import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  favoriteList: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '100%',
  },
  favoritePageTitle: {
    color: 'rgb(236, 213, 213)',
    marginBottom: '4%',
  },

  favoriteItems: {
    position: 'relative',
    width: '200px',
    minHeight: '300px',
    boxShadow: '-1px 10px 13px 0px rgba(33, 33, 194, 1)',
    cursor: 'pointer',
    marginBottom: '4%',
    transition: '0.4s',
    transform: 'scale(1) scaleZ(1) rotateX(16deg)',
    transformOrigin: '0% 0%',
    perspective: 200,
    perspectiveOrigin: '50% 50%',
    '&:hover': {
      boxShadow: '-1px 10px 13px 8px rgba(33, 33, 194, 1)',
      transform: 'scale(1) scaleZ(1) rotateX(0deg)',
      transformOrigin: '0% 0%',
      perspective: 200,
      perspectiveOrigin: '50% 50%',
      zIndex: 8,
    },
  },

  favoriteItemsTitle: {
    width: '100%',
    textAlign: 'center',
    color: 'aquamarine',
  },

  removeFavoriteItems: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40px',
    height: '40px',
    zIndex: 200,
    background: '#00000094',
    borderRadius: '10px',
    '&:hover': {
      transform: 'scale(1.1) scaleZ(1.1)',
      boxShadow: '-1px 10px 13px -10px rgba(96, 96, 133, 1)',
    },
  },
  noFavorites: {
    fontSize: '1.4rem',
    fontWeight: 'bolder',
    color: 'rgb(199, 199, 233)',
    fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
  },
}));

export default useStyles;