import {Values} from '../types';

interface Errors {
  message?: string;
}

export const validation = (values: Values) => {
  const errors: Errors  = {};

  if (!values.message) {
    errors.message = 'Required';
  } else if (values.message.length > 200) {
    errors.message = 'Max length 200';
  }
  return errors;
};