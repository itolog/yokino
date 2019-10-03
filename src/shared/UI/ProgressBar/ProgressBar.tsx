import React, { useEffect, useState } from 'react';

import './progressBar.scss';

interface Props {
  loading: boolean;
}

const ProgressBar: React.FC<Props> = ({ loading }) => {
  const [progress, setProgress] = useState('0%');

  useEffect(() => {
    if (loading) {
      setProgress('100%');
    }
  }, [progress]);

  return (
    <div className='progress-bar'>
      <span className='progress-bar-fill' style={{ width: progress }} />
    </div>
  );
};
export default ProgressBar;
