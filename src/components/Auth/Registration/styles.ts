import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    registration: {
      position: 'relative',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      minHeight: '300px',
      minWidth: '280px',
      boxShadow: '0px 0px 5px 0px rgba(230, 209, 230, 1)',
      backgroundColor: '#9dc5c3',
      backgroundImage: 'linear-gradient(to right top, #051937, #111e4a, #26205b, #3f1f6a, #5c1874)',
    },
    title: {
      color: '#c6d9ec',
    },
    inputIcon: {
      color: 'white',
    },
  }),
);