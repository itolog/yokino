import React, { useEffect, useState } from 'react';

import useStyles from './styles';

interface Props {
  loading: boolean;
}

const ProgressBar: React.FC<Props> = ({ loading }) => {
  const classes = useStyles();

  const [ progress, setProgress ] = useState('0%');

  useEffect(() => {
    if (loading) {
      setProgress('98%');
    }
  }, [ progress, loading ]);

  return (
    <div className={classes.progressBar}>
      <span className={classes.progressBarFill} style={{ width: progress }}/>
    </div>
  );
};
export default ProgressBar;
