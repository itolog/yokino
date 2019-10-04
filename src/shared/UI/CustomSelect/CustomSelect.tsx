import React from 'react'; 

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
    <select onChange={onChange} className='custom-select'>
      {options.map((item: Option, index: number) => {
        return (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        );
      })}
    </select> 
  );
};

export default CustomSelect;
