import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  moviePage: {
    paddingTop: '100px',
  },
  videoMedia: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexFlow: 'wrap',
    marginBottom: '5rem',
  },
  favoriteBtn: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignContent: 'center',
    minHeight: '60px',
    marginBottom: '1rem',
  },
  mediaBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100vw',
    height: '100%',
    overflow: 'hidden',
    boxShadow: '0px 10px 127px 106px rgba(27, 32, 48, 1)',
    '&:after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      background: 'linear-gradient(to bottom,rgba(0, 0, 0, 0.52) 30%,rgba(27, 32, 48, 1) 100%)',
    },
  },

  mediaBackdropImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },

  partsMovie: {
    display: 'flex',
    flexFlow: 'column',
    marginBottom: '3%',
    alignItems: 'center',
    [ theme.breakpoints.down(769) ]: {
      marginBottom: '15%',
    },
  },
  partsMovieTitle: {
    color: 'wheat',
    marginBottom: '2%',
  },
  partsMovieContent: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: ' row wrap',
    width: '100%',
    [ theme.breakpoints.down(769) ]: {
      justifyContent: 'space-evenly',
    },
  },
}));

export default useStyles;