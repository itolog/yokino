import React, { memo } from 'react';

import useStyles from './styles';

interface Option {
  value: number | string;
  label: number | string;
}

interface Props {
  options: Option[];
  onChange: (event: any) => void;
}

const CustomSelect: React.FC<Props> = memo(({ options, onChange }) => {
  const classes = useStyles();
  return (
    <select onChange={onChange} onBlur={onChange} className={classes.customSelect}>
      {options.map((item: Option, index: number) => {
        return (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
});

export default CustomSelect;
