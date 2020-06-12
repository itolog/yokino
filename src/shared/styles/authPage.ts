import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  authPage: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    flexFlow: 'column',
    alignItems: 'center',
  },
  authLogReg: {
    color: '#1e62d0',
    marginTop: '7%',
    cursor: 'pointer',
  },
}));

export default useStyles;