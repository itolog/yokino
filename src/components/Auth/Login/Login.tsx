import React from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from 'gatsby';

import { useLazyQuery } from '@apollo/react-hooks';

import { Field, Form } from 'react-final-form';

import CustomField from '../../../shared/Forms/customField';
import { validation } from './validation';
// MAterial
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';

// store
import { Actions as userActions } from '../../../state/user/actions';
import SendButton from '../../../shared/Forms/SendButton/sendButton';
import { UserLoginDto } from '../../../shared/generated/graphql';
import { LOGIN } from '../../../shared/ggl/login';
import { LoginValues } from './types';

import { useStyles } from './styles';

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const loginCompleate = async ({ login }: { login: UserLoginDto }) => {
    dispatch(userActions.setUser(login));
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

  const onSubmit = (values: LoginValues) => {
    return getLoginState({
      variables: {
        pass: values.password,
        name: values.name,
      },
    });
  };

  const formContent = ({ handleSubmit }: any) => (
    <form onSubmit={handleSubmit} className={classes.login}>
      <h2 className={classes.title}>Войти</h2>
      {error && (
        <div className='login-error isa_error'>{getFetchAuthError(error)}</div>
      )}

      <Field name='name'>
        {({ input, meta }) => (
          <CustomField input={input} meta={meta}>
            <PersonIcon className={classes.inputIcon}/>
          </CustomField>
        )}
      </Field>
      <Field name='password' type='password'>
        {({ input, meta }) => (
          <CustomField input={input} meta={meta}>
            <VpnKeyIcon className={classes.inputIcon}/>
          </CustomField>
        )}
      </Field>
      <SendButton loading={loading}/>
    </form>
  );

  return <Form validate={validation} onSubmit={onSubmit} render={formContent}/>;
};

export default Login;
