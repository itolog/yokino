import React, { memo, useEffect } from 'react';
import * as Sentry from '@sentry/browser';

import './error.scss';

interface Props {
  error: string;
}

const Error: React.FC<Props> = memo(({ error }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error])
  return (
    <div className='error-wrapp'>
      <p className='error-message'>{error}</p>
    </div>
  );
});

export default Error;
