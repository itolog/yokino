import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Field, Form } from 'react-final-form';
import { UserLoginDto } from '../../generated/graphql';
import { CREATE_USER } from '../../ggl/createUser';

import './registration.scss';

// store
import { Actions } from '../../../state/user/actions';
import { LOGIN } from '../../ggl/login';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: (payload: UserLoginDto) => dispatch(Actions.setUser(payload)),
});

type Props = ReturnType<typeof mapDispatchToProps>;

const Registration: React.FC<Props> = ({ loginUser }) => {
  const [ passWord, setPassWord ] = useState();
  const [ nameUser, setNameUser ] = useState();

  // Login after registration
  const loginCompleate = async ({ login }: any) => {
    await loginUser(login);
    await navigate('/');
  };
  const [ getLoginState ] = useLazyQuery(LOGIN, {
    onCompleted: loginCompleate,
  });
// registration
  const registrationCompleate = () => {
    getLoginState({
      variables: {
        pass: passWord,
        name: nameUser,
      },
    });
  };
  const [ addUser, { loading, error } ] = useMutation(CREATE_USER, {
    onCompleted: registrationCompleate,
  });

  const onSubmit = (values: any) => {
    setNameUser(values.name);
    setPassWord(values.password);

    return addUser({
      variables: {
        input: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      },
    });
  };


  const formContent = ({ handleSubmit }: any) => (
    <form onSubmit={handleSubmit} className='login '>
      <h2>Регистрация</h2>
      {loading && <div className='login-loading isa_info '>loading</div>}
      {error && error.graphQLErrors && error.graphQLErrors.map(({ message }: any, i: number) => (
        <span key={i} className='login-error isa_error'>{message.detail}</span>
      ))}
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
          name='email'
          type='email'
          component='input'
          placeholder='email'
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
        зарегистрироваться
      </button>
    </form>
  );


  return <Form onSubmit={onSubmit} render={formContent}/>;
};

export default connect(null, mapDispatchToProps)(Registration);