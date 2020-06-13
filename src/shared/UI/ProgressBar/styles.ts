import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  progressBar: {
    position: 'relative',
    top: 0,
    zIndex: 10,
    width: '100%',
  },

  progressBarFill: {
    display: 'block',
    height: '5px',
    backgroundColor: '#659cef',
    borderRadius: '3px',
    transition: '1500ms ease-in-out',
    animationName: '$example',
    animationDuration: '1500ms',
    animationIterationCount: 'infinite',
  },

  '@keyframes example': {
    '0%': {
      backgroundColor: '#659cef',
    },
    '25%': {
      backgroundColor: 'rgb(97, 231, 186)',
    },
    '50%': {
      backgroundColor: 'rgb(80, 177, 156)',
    },
    '70%': {
      backgroundColor: 'rgb(180, 71, 194)',
    },
    '90%': {
      backgroundColor: 'rgb(218, 92, 190)',
    },
  },

}));

export default useStyles;
