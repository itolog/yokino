import React from 'react';
import './customCheckBox.scss';

interface Props {
  isCamrip: boolean;
  handleCamripChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckBox: React.FC<Props> = ({ isCamrip, handleCamripChange }) => {
  return (
    <label className='toggle'>
      <input
        className='toggle__input'
        type='checkbox'
        checked={isCamrip}
        onChange={handleCamripChange}
      />
      <span className='toggle__label'>
        <span className='toggle__text'>camrip</span>
      </span>
    </label>
  );
};

export default CustomCheckBox;
