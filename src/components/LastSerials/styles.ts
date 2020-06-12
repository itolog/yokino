import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  lastSerials: {
    display: 'flex',
    flexFlow: 'column',
    width: '90%',
    [ theme.breakpoints.down(769) ]: {
      flexFlow: 'row',
      overflowX: 'auto',
      overflowY: 'hidden',
      width: '250px',
      minHeight: '200px',
      marginBottom: '5%',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  lastSerialsItems: {
    position: 'relative',
    textAlign: 'center',
    margin: '1px',
    borderRadius: '5px',
    boxShadow: '0px 0px 8px 2px rgb(26, 2, 26)',
    perspective: '1410px',
    perspectiveOrigin: '45% 50%',
    transition: ' 0.5s',
    backgroundImage: `linear-gradient(
      to right,
      #1a143b,
      #24143d,
      #2e133f,
      #381240,
      #421040,
      #421040,
      #421040,
      #421040,
      #381240,
      #2e133f,
      #24143d,
      #1a143b
    )`,
    '&:hover': {
      boxShadow: '0px 0px 12px 5px rgba(0, 0, 0, 1)',
      transform: 'scale(1.1) scaleZ(1) rotateZ(0deg)',
      zIndex: '20',
    },
    [ theme.breakpoints.down('sm') ]: {
      transform: 'scale(1.1) scaleZ(1) rotateZ(0deg)',
      margin: '2% 0',
    },
    [ theme.breakpoints.down(769) ]: {
      margin: '5%',
    },
  },
  episodesTitle: {
    fontSize: '1em',
  },
  episodesSerial: {
    position: 'relative',
    color: 'rgb(206, 232, 241)',
    fontWeight: 'bold',
    height: '100%',
    top: '0',
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    justifyContent: 'space-around',
    zIndex: '2',
    [ theme.breakpoints.down('sm') ]: {
      minWidth: '200px',
      width: 'auto',
    },
  },

  episodesSerialContent: {
    display: 'flex',
    flexFlow: 'wrap column',
  },
  serialsHref: {
    height: '100%',
  },
  waiting: {
    position: ' absolute',
    bottom: '0',
    width: '20px',
    height: '20px',
    [ theme.breakpoints.down('sm') ]: {
      bottom: '10px',
    },
  },
  skelet: {
    background: '#490e50',
  },
}));

export default useStyles;