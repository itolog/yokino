import { RegistrationValues } from './types';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export const validation = (values: RegistrationValues) => {
  const errors: Errors = {};

  if (!values.name) {
    errors.name = 'Заполните';
  }

  if(!values.email) {
    errors.email = 'Заполните';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный email';
  }

  if(!values.password) {
    errors.password = 'Заполните';
  }

  return errors;
};