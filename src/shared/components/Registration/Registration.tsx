import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React, { useState } from 'react';

import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { navigate } from 'gatsby';

import { useDispatch } from 'react-redux';

import { Field, Form } from 'react-final-form';
import CustomField from '../../Forms/customField';
import SendButton from '../../Forms/SendButton/sendButton';
import { UserLoginDto } from '../../generated/graphql';
import { REEGISTRATION } from '../../ggl/registration';
import { validation } from './validation';

// MATERILA
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

import { useStyles } from './styles';

// store
import { Actions } from '../../../state/user/actions';
import { LOGIN } from '../../ggl/login';


const Registration = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [ passWord, setPassWord ] = useState();
  const [ nameUser, setNameUser ] = useState();

  // Login after registration
  const loginCompleate = async ({ login }: { login: UserLoginDto }) => {
    dispatch(Actions.setUser(login));
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
  const [ addUser, { loading, error } ] = useMutation(REEGISTRATION, {
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
    <form onSubmit={handleSubmit} className={classes.registration}>
      <h2 className={classes.title}>Регистрация</h2>
      {error && error.graphQLErrors && error.graphQLErrors.map(({ message }: any, i: number) => (
        <span key={i} className='login-error isa_error'>{message.detail}</span>
      ))}
      <Field name='name'>
        {({ input, meta }) => (
          <CustomField input={input} meta={meta}>
            <PersonIcon className={classes.inputIcon}/>
          </CustomField>
        )}
      </Field>
      <Field name='email' type='email'>
        {({ input, meta }) => (
          <CustomField input={input} meta={meta}>
            <EmailIcon className={classes.inputIcon}/>
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

export default Registration;