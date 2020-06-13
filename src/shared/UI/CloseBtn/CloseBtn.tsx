import React from 'react';

import useStyles from './styles';

interface Props {
  onclick: () => void;
}

const CloseBtn: React.FC<Props> = ({ onclick }) => {
  const classes = useStyles();
  return (
    <div className={classes.closeContainer} onClick={onclick}>
      <div className={classes.leftright}/>
      <div className={classes.rightleft}/>
    </div>
  );
};

export default CloseBtn;
