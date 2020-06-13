import { makeStyles, Theme } from '@material-ui/core/styles';

const fuschia = '#ff6222';
const buttonBg = fuschia;
const buttonTextColor = '#fff';
const babyBlue = '#f8faff;';

const useStyles = makeStyles((theme: Theme) => ({
  trailerIframeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  trailerIframe: {
    boxShadow: '0px 0px 22px 6px rgba(23, 43, 82, 1)',
    width: '600px',
    height: '400px',
    [ theme.breakpoints.down(768) ]: {
      width: '90%',
    },
    [ theme.breakpoints.down(48) ]: {
      width: '100%',
    },
  },

  bubblyButton: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
    fontWeight: 'bolder',
    display: 'inline-block',
    fontSize: '1em',
    padding: '1em 2em',
    margin: '2% 0',
    appearance: 'none',
    backgroundColor: buttonBg,
    color: buttonTextColor,
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'ease-in 0.3s',
    boxShadow: '0 2px 25px rgba(255, 0, 130, 0.5)',
    overflow: 'hidden',

    '&:focus': {
      outline: 0,
    },

    '&:active': {
      boxShadow: '0 2px 25px rgba(255, 0, 130, 0.2)',
    },
    '&:hover': {
      background: '#1A143B'
    },
  },

}));

export default useStyles;
