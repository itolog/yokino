import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  errorWrapp: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 18px 12px rgba(68, 186, 194, 1)',
  },

  errorMessage: {
    padding: '10%',
    boxShadow: '0 0 18px 12px rgb(194, 24, 21)',
    color: 'wheat',
  },

}));

export default useStyles;