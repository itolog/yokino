import { navigate } from 'gatsby';
import React from 'react';

import { useLazyQuery } from '@apollo/react-hooks';
import { Field, Form } from 'react-final-form';

import './login.scss';

import { take } from 'rxjs/operators';
import { LOGIN } from '../../ggl/login';
import AuthTokenService from '../../services/authToken.service';

const Login = () => {
  const loginCompleate = async ({ login }: any) => {
    await AuthTokenService.setAuthToken(login.access_token).pipe(take(1));
    await navigate('/');
  };
  const [getLoginState, { loading, error, data }] = useLazyQuery(LOGIN, {
    onCompleted: loginCompleate,
  });

  const getFetchAuthError = (e: any) => {
    if (e) {
      const res = e.message.split(':')[1];
      return res;
    }
  };

  const onSubmit = async (values: any) => {
    return await getLoginState({
      variables: {
        pass: values.password,
        name: values.name,
      },
    });
  };

  const formContent = ({ handleSubmit }: any) => (
    <form onSubmit={handleSubmit} className='login '>
      <h2>Войти</h2>
      {loading && <div className='login-loading isa_info '>loading</div>}
      {error && (
        <div className='login-error isa_error'>{getFetchAuthError(error)}</div>
      )}
      <div>
        <Field
          className='form-input'
          name='name'
          component='input'
          placeholder='имя'
          required={true}
        />
      </div>
      <div>
        <Field
          className='form-input'
          name='password'
          component='input'
          placeholder='пароль'
          type='password'
          required={true}
        />
      </div>

      <button type='submit' className='login-btn'>
        войти
      </button>
    </form>
  );

  return <Form onSubmit={onSubmit} render={formContent} />;
};

export default Login;
