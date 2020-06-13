import React, { memo, useEffect } from 'react';
import * as Sentry from '@sentry/browser';

import useStyles from './styles';

interface Props {
  error: string;
}

const Error: React.FC<Props> = memo(({ error }) => {
  const classes = useStyles();
  useEffect(() => {
    Sentry.captureException(error);
  }, [error])
  return (
    <div className={classes.errorWrapp}>
      <p className={classes.errorMessage}>{error}</p>
    </div>
  );
});

export default Error;
