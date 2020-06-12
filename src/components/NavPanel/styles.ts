import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  '@global': {
    '.MuiDrawer-paperAnchorLeft': {
      backgroundImage: 'linear-gradient(to right, #051937, #0b1536, #121134, #180c32, #1e052e)',
      '&:hover': {
        boxShadow: '4px 5px 7px 0px rgba(206, 82, 212, 1)',
      },
    },
  },
  list: {
    width: '270px',
    paddingBottom: '7%',
    overflowX: 'hidden',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    backgroundImage: 'linear-gradient(to right, #0d1829, #0b1836, #111741, #201249, #32064e)',
    justifyContent: 'space-between',
  },
  link: {
    display: 'inherit',
    color: 'wheat',
    width: '100%',
    boxShadow: '4px 5px 7px 0px rgba(83, 153, 214, 1)',
    transition: '0.4s',
    margin: '2% 1%',
    padding: '2% 0',
    '&:hover': {
      boxShadow: '4px 5px 7px 0px rgba(206, 82, 212, 1)',
      color: 'orangered',
      textShadow: '5px 5px 10px rgba(83, 153, 214, 1)',
    },
  },
});

export default useStyles;