import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrappCollection: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    justifyContent: 'center',
  },

  collectionProgress: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
}));

export default useStyles;