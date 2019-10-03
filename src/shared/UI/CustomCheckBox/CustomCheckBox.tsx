import React from 'react';
import './customCheckBox.scss';

interface Props {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string
}

const CustomCheckBox: React.FC<Props> = ({ isChecked, handleChange, label }) => {
  return (
    <label className='toggle'>
      <input
        className='toggle__input'
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
      />
      <span className='toggle__label'>
        <span className='toggle__text'>{label}</span>
      </span>
    </label>
  );
};

export default CustomCheckBox;
