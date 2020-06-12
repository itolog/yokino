import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',
    paddingTop: '50px',
    width: '100%',
  },

  searchTitle: {
    marginBottom: '20px',
    textAlign: 'center',
    color: 'burlywood',
    [ theme.breakpoints.down(480) ]: {
      fontSize: '1.4em',
    },
  },
}));

export default useStyles;