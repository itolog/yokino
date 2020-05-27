import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
// store
import { Actions } from '../../../state/mail/actions';
import { AppState } from '../../../state/createStore';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarUI = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isOpen = useSelector((state: AppState) => state.mail.isSend);
  const message = useSelector((state: AppState) => state.mail.message);
  const error = useSelector((state: AppState) => state.mail.error);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(Actions.sendReset());
  };

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={!error ? 'success' : 'error'}>{!error ? message : error}</Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarUI;