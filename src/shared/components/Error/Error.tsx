import React, { memo, useEffect } from 'react';
import * as Sentry from '@sentry/browser';

import useStyles from './styles';

interface Props {
  error: any;
  errorMsg?: string;
}

const Error: React.FC<Props> = memo(
  ({ error, errorMsg = 'Что то пошло не так.' }) => {
    const classes = useStyles();
    useEffect(() => {
      Sentry.captureException(error);
    }, [error]);
    return (
      <div className={classes.errorWrapp}>
        <p className={classes.errorMessage}>{errorMsg}</p>
      </div>
    );
  },
);

export default Error;
