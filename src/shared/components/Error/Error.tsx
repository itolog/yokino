import React, { memo } from 'react';

import './error.scss';

interface Props {
  error: string;
}

const Error: React.FC<Props> = memo(({ error }) => {
  return (
    <div className='error-wrapp'>
      <p className='error-message'>{error}</p>
    </div>
  );
});

export default Error;
