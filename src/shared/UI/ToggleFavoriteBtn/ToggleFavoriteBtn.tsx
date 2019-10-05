import React from 'react';

import './addToFavoriteBtn.scss';

interface Props {
  handleEvent: () => void;
  children: React.ReactNode;
}

const ToggleFavoriteBtn: React.FC<Props> = ({ handleEvent, children }) => {
  return (
    <button className='add-to-favorite-btn' onClick={handleEvent}>
      {children}
    </button>
  );
};

export default ToggleFavoriteBtn;
