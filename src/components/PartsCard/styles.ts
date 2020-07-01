import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  partsCard: {
    width: '160px',
    color: 'white',
    cursor: 'pointer',
    margin: '0.2em',
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
  wrappImage: {
    position: 'relative',
    width: '160px',
    height: '220px',
  },
  skeletCard: {
    background: '#392448',
  },
  year: {
    position: 'absolute',
    zIndex: 1,
    background: '#000000a8',
  }
}));

export default useStyles;