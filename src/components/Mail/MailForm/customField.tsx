import React from 'react';

import { InputAdornment } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

import { FieldInputProps, FieldMetaState } from 'react-final-form';

interface Props {
  textArea?: boolean;
  children: React.ReactElement | React.ReactElement[],
  input: FieldInputProps<any>,
  meta: FieldMetaState<any>,
}

const useStyles = makeStyles(() => ({
  textInput: {
    color: '#fff',
    borderBottom: ' solid rgba(10, 180, 180, 1)',
  },
}));

const CustomField: React.FC<Props> = ({ children, input, meta, textArea = false }) => {
  const classes = useStyles();

  return (
    <FormControl >
      <InputLabel
        error={meta.touched && !!meta.error}
        htmlFor={`${input.name}-input-with-icon-adornment`}>{meta.touched && meta.error}</InputLabel>
      <Input
        multiline={textArea}
        rows={!textArea ? 1 : 4}
        id={`${input.name}-input-with-icon-adornment`}
        {...input}
        className={classes.textInput}
        startAdornment={
          <InputAdornment position='start'>
            {children}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CustomField;