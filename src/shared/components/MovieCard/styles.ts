import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    '.gatsby-image-wrapper': {
      height: '100%',
    },
  },

  layoutMovieCard: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    flexBasis: '200px',
    maxHeight: '400px',
    margin: '2px',
    alignItems: 'center',
    [theme.breakpoints.down(480)]: {
      margin: '5% 0',
    },
  },

  movieCard: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    overflow: 'hidden',
    borderRadius: '10px',
    transition: '0.6s',
    border: '2px solid #17a59e',
    '&:hover': {
      zIndex: 10,
      transform: 'scale3d(0.98, 0.98, 0.98)',
      border: '2px solid #df1e95',
    },
    '&:hover $rating': {
      transform: 'translateX(-100%)',
      transition: '0.4s',
    },
    '&:hover $infoHeader': {
      transform: 'translateY(-100%)',
      transition: '0.4s',
    },
    '&:hover $cardTitle': {
      color: '#02e38c',
      transition: '0.3s',
    },
    [theme.breakpoints.down(768)]: {
      flexBasis: '280px',
    },
  },

  posterWrapp: {
    width: '200px',
    height: '300px',
  },

  cardTitle: {
    color: '#fff',
    textAlign: 'center',
    padding: '2px',
    backgroundColor: 'rgba(5, 44, 56, 0.83)',
  },

  cardQuality: {
    color: 'wheat',
    paddingLeft: '3%',
  },

  info: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: '0.5s',
    backgroundColor: 'rgba(4, 19, 25, 0.5)',
    '&:hover': {
      backgroundColor: 'rgba(4, 19, 25, 0.2)',
    },
  },

  infoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(45, 72, 80, 0.92)',
  },

  wrappGenres: {
    display: 'flex',
    flexFlow: 'wrap',
  },

  genres: {
    backgroundColor: 'green',
  },

  ratelabelYear: {
    maxWidth: '50%',
    textalign: 'center',
    alignSelf: 'flex-end',
  },

  ratelabel: {
    lineHeight: '30px',
    padding: '0 10px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#f05',
    height: '30px',
    zIndex: 4,
    margin: '1px',
  },

  raitContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  rating: {
    position: 'relative',
    color: 'white',
    textAlign: 'right',
    lineHeight: '30px',
  },

  ratingImdb: {
    backgroundColor: '#9c27b0',
    '&::after': {
      content: '""',
      position: 'absolute',
      borderTop: '30px solid #9c27b0',
      borderRight: '25px solid transparent',
      left: '100%',
    },
  },

  ratingKinopoisk: {
    backgroundColor: '#f05',
    '&::after': {
      content: '""',
      position: 'absolute',
      borderTop: '30px solid #f05',
      borderRight: '25px solid transparent',
      left: '100%',
    },
  },
}));

export default useStyles;
