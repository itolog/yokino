import { makeStyles, Theme } from '@material-ui/core';

const colPrimary = '#00c7ec';
const cornerRadius = '5px';

const useStyles = makeStyles((theme: Theme) => ({
  playerCheckbox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginBottom: '1%',
    [ theme.breakpoints.down(480) ]: {
      flexDirection: 'column',
    },
  },
  playerSection: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    zIndex: 10,
    boxShadow: '0 0 18px 12px rgba(68, 186, 194, 1)',
    paddingTop: '1%',
    background: 'black',
    [ theme.breakpoints.down(768) ]: {
      width: '90%',
      boxShadow: '0 0 15px 0 rgba(68, 186, 194, 1)',
    },
    [ theme.breakpoints.down(480) ]: {
      width: '100%',
    },
  },
  videoIframe: {
    width: '100%',
  },
  player: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '700px',
    [ theme.breakpoints.down(768) ]: {
      width: '95%',
    },
  },
  wrappSpinLoader: {
    position: 'absolute',
    width: '100%',
    filter: 'blur(5px)',
  },
  linearSpiner: {
    width: '100%',
  },
  // Buttons
  rainbowButton: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontFamily: '"Exo 2", sans-serif',
    background: '#012839',
    display: 'inline-block',
    position: 'relative',
    textAlign: 'center',
    color: colPrimary,
    border: `1px solid ${colPrimary}`,
    borderRadius: cornerRadius,
    outline: 'none',
    lineHeight: '3em',
    paddingLeft: '3em',
    paddingRight: '3em',
    cursor: 'pointer',
    boxShadow: '0 0 0 0 transparent',
    margin: '0 1%',
    transition: 'all 0.2s ease-in',
    [ theme.breakpoints.down(480) ]: {
      margin: '1% auto',
      width: '70%',
    },
    '&:hover': {
      color: 'white',
      boxShadow: `0 0 30px 0 transparentize(${colPrimary}, 0.5)`,
      backgroundColor: colPrimary,
      transition: 'all 0.2s ease-out',
      '&:before': {
        animation: '$shine 0.5s 0s linear',
      },
    },
    '&:active': {
      boxShadow: '0 0 0 0 transparent',
      transition: 'box-shadow 0.2s ease-in',
    },
    '&:before': {
      content: '""',
      display: 'block',
      width: '0px',
      height: '86%',
      position: 'absolute',
      top: '7%',
      left: '0%',

      opacity: 0,
      background: 'white',
      boxShadow: '0 0 15px 3px white',
      transform: 'skewX(-20deg)',
    },
  },
  rainbowButtonActive: {
    backgroundColor: '#0e5b7c',
    transform: 'scale3d(0.9, 0.9, 0.9)',
  },
  //  @keyframes
  '@keyframes shine': {
    '0%': {
      opacity: 0,
      left: '0%',
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
      left: '100%',
    },
  },
}));

export default useStyles;