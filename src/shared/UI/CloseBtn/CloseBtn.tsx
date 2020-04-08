import React from 'react';

import './closeBtn.scss';

interface Props {
  onclick: () => void;
}

const CloseBtn: React.FC<Props> = ({ onclick }) => {
  return (
    <div className='close-container' onClick={onclick}>
      <div className='leftright' />
      <div className='rightleft' />
    </div>
  );
};

export default CloseBtn;
