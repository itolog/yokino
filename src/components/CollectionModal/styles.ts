import { makeStyles } from '@material-ui/core/styles';

const textColor = 'hsla(210, 50%, 85%, 1)';
const shadowColor = 'hsla(252, 100%, 80%, 0.4)';
const btnColor = 'hsl(210, 80%, 42%)';
const bgColor = '#141218';

const useStyles = makeStyles((theme) => ({
  collection: {
    [ theme.breakpoints.down(480) ]: {
      marginBottom: '5%',
    },
  },
  collectionContainer: {
    height: '80vh',
  },
  collectionList: {
    display: 'flex',
    flexFlow: 'row wrap',
    height: '100%',
    overflowY: 'scroll',
    margin: 0,

    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [ theme.breakpoints.down(480) ]: {
      flexFlow: 'column',
    },
  },
  collectionItems: {
    position: 'relative',
    background: 'none',
    color: ' #ffffff',
    textTransform: 'uppercase',
    textDecoration: 'none',
    border: '0.2em solid #740C55',
    padding: '0.5em 1em',
    margin: '1%',
    cursor: 'pointer',
    fontSize: '0.9em',
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '10%',
      background: '#222',
      height: '0.3em',
      right: '20%',
      top: '-0.21em',
      transform: 'skewX(-45deg)',
      transition: 'all 0.45s cubic-bezier(0.86, 0, 0.07, 1)',
    },
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '10%',
      background: '#222',
      height: '0.3em',
      left: '20%',
      bottom: '-0.25em',
      transform: 'skewX(45deg)',
      transition: 'all 0.45s cubic-bezier(0.86, 0, 0.07, 1)',
    },
    '&:hover': {
      color: '#00abef',
      '&::before': {
        right: '80%',
      },
      '&::after': {
        left: '80%',
      },
    },
  },
  collectioBtn: {
    position: 'relative',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 900,
    textTransform: 'uppercase',
    fontSize: '20px',
    color: textColor,
    backgroundImage: 'linear-gradient(to right top, #051937, #01163a, #00133c, #000f3e, #04093f)',
    boxShadow: `${shadowColor} 2px 2px 22px`,
    borderRadius: '4px',
    zIndex: 0,
    overflow: 'hidden',
    transition: '.5s',

    '&:hover': {
      backgroundImage: 'linear-gradient(to right top, #040a12, #10172c, #281d44, #4c1c52, #740c55)',
    },
    '&:focus': {
      outlineColor: 'transparent',
      boxShadow: `${btnColor} 2px 2px 22px`,
    },
    '&::after': {
      fontWeight: 200,
      top: '-30px',
      left: '-20px',
    },
    '&::before': {
      content: '""',
      pointerEvents: 'none',
      opacity: '.6',
      background: `
      radial-gradient(circle at 20% 35%, transparent 0, transparent 2px, ${textColor} 3px, ${textColor} 4px, transparent 4px),
     radial-gradient(circle at 75% 44%, transparent 0, transparent 2px, ${textColor} 3px, ${textColor} 4px, transparent 4px),
     radial-gradient(circle at 46% 52%, transparent 0, transparent 4px, ${textColor} 5px, ${textColor} 6px, transparent 6px)
     `,
      width: '100%',
      height: '300%',
      top: 0,
      left: 0,
      position: 'absolute',
      animation: '$bubbles 5s linear infinite both',
    },
  },

  '@keyframes bubbles': {
    '0%': {
      transform: 'translate(0)',
    },
    '100%': {
      transform: 'translate(0, -66.666%)',
    },
  },
}));

export default useStyles;