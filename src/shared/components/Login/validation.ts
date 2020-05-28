import { LoginValues } from './types';

interface Errors {
  name?: string;
  password?: string;
}

export const validation = (values: LoginValues) => {
  const errors: Errors = {};

  if (!values.name) {
    errors.name = 'Заполните';
  }

  if(!values.password) {
    errors.password = 'Заполните';
  }

  return errors;
};