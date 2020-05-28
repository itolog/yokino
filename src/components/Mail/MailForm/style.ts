import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    root: {
      '.MuiInputBase-input': {
        color: 'lime',
      },
    },
    formContainer: {
      position: 'relative',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      minHeight: `300px`,
      minWidth: `280px`,
      boxShadow: '0px 0px 5px 0px rgba(230, 209, 230, 1)',
      overflow: 'hidden',
    },
    canselBtn: {
      alignSelf: 'flex-end',
    },
    bgImg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(20, 40, 40, 0.8)',
    },
    bgImageContent: {
      zIndex: -1,
    },
    inputIcon: {
      color: 'white',
    },
  }),
);