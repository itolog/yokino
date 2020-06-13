import React, { memo } from 'react';

import useStyles from './styles';

interface Props {
  handleEvent: () => void;
  children: React.ReactNode;
}

const ToggleFavoriteBtn: React.FC<Props> = memo(({ handleEvent, children }) => {
  const classes = useStyles();
  return (
    <button className={classes.addToFavoriteBtn} onClick={handleEvent}>
      {children}
    </button>
  );
});

export default ToggleFavoriteBtn;
