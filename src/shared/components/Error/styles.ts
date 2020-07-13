import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  errorWrapp: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2em',
  },

  errorMessage: {
    padding: '10%',
    boxShadow: '0 0 18px 12px rgb(194, 24, 21)',
    color: 'wheat',
  },

}));

export default useStyles;