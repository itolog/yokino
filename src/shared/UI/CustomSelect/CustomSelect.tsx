import React from 'react';
import Select from 'react-select';

import './customSelect.scss';

interface Option {
  value: number | string;
  label: number | string;
}

interface Props {
  options: Option[];
  onChange: (event: any) => void;
}

const CustomSelect: React.FC<Props> = ({ options, onChange }) => {
  return (
    <Select options={options} defaultValue={options[0]} onChange={onChange} />
  );
};

export default CustomSelect;
