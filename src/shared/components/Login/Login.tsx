import { useLazyQuery } from '@apollo/react-hooks';
import { navigate } from 'gatsby';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// store
import { Actions as userActions } from '../../../state/user/actions';
import { UserLoginDto } from '../../generated/graphql';
import { LOGIN } from '../../ggl/login';

import './login.scss';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (payload: UserLoginDto) => dispatch(userActions.setUser(payload)),
});

type Props = ReturnType<typeof mapDispatchToProps>;

const Login: React.FC<Props> = ({ setUser }) => {
  const loginCompleate = async ({ login }: any) => {
    await setUser(login);
    await navigate('/');
  };
  const [ getLoginState, { loading, error } ] = useLazyQuery(LOGIN, {
    onCompleted: loginCompleate,
  });

  const getFetchAuthError = (e: any) => {
    if (e) {
      return e.message.split(':')[ 1 ];
    }
  };

  const onSubmit = (values: any) => {
    return getLoginState({
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

      <button type='submit' className='login-btn' disabled={loading}>
        войти
      </button>
    </form>
  );

  return <Form onSubmit={onSubmit} render={formContent}/>;
};

export default connect(null, mapDispatchToProps)(Login);
