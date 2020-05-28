import {Values} from '../types';

interface Errors {
  message?: string;
}

export const validation = (values: Values) => {
  const errors: Errors  = {};

  if (!values.message) {
    errors.message = 'Заполните';
  } else if (values.message.length > 500) {
    errors.message = 'Макс. длина 500';
  }
  return errors;
};