import React, { memo } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import { useStyles } from './styles';

interface Props {
  loading: boolean;
}

const SendButton: React.FC<Props> = memo(({ loading }) => {
  const classes = useStyles();
  return (
    <div className={classes.submitMail}>
      <IconButton
        type='submit'
        disabled={loading}
        aria-label='submit'
      >
        <SendIcon style={{ color: 'yellow' }}/>
      </IconButton>

      {loading && <CircularProgress size={34} className={classes.buttonProgress}/>}
    </div>
  );
});

export default SendButton;
