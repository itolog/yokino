import React, { memo } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { Field, Form } from 'react-final-form';
import { UserLoginDto } from '../../../shared/generated/graphql';
import { SEND_MAIL } from '../../../shared/ggl/mail';

import { useStyles } from './style';

import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomField from './customField';

// ICONS
import PersonIcon from '@material-ui/icons/Person';
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
// STORE
import { Actions as mailActions } from '../../../state/mail/actions';
import { getUser } from '../../../state/user/selectors';

import { validation } from './validation';
import { Values } from '../types';

interface Props {
  onClose: () => void;
}

const MailForm: React.FC<Props> = memo(({ onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user: UserLoginDto = useSelector(getUser);

  const formBg = useStaticQuery(graphql`
      query {
          file(relativePath: { eq: "form-bg.jpg" }) {
              childImageSharp {
                  fixed(width: 300, height: 360, quality: 80) {
                      ...GatsbyImageSharpFixed
                  }
              }
          }
      }
  `);

  const [ sendMail, { loading } ] = useMutation(SEND_MAIL);

  const onSubmit = (values: Values) => {
    sendMail({
      variables: {
        input: {
          from: user.email,
          name: user.name,
          text: values.message.trim(),
        },
      },
    }).then(() => {
      onClose();
      dispatch(mailActions.sendMail('сообщение отправлено!'));
    }).catch((e) => {
      onClose();
      dispatch(mailActions.sendMailFailure(e.message));
    });
  };

  // FORM CONTENT
  const formContent = ({ handleSubmit }: any) => (
    <form
      onSubmit={handleSubmit}
      className={classes.formContainer}
    >
      {/*  BG */}
      <div className={classes.bgImg}>
        <Img fixed={formBg.file.childImageSharp.fixed} alt='form background' className={classes.bgImageContent}/>
      </div>

      <IconButton aria-label='close' type='button' onClick={onClose} className={classes.canselBtn}>
        <CancelPresentationTwoToneIcon color='secondary'/>
      </IconButton>

      <Field name='message'>
        {({ input, meta }) => (
          <CustomField input={input} meta={meta} textArea={true}>
            <MessageIcon className={classes.inputIcon}/>
          </CustomField>
        )}
      </Field>
      <div className={classes.submitMail}>
        <IconButton
          type='submit'
          disabled={loading}
          aria-label='send mail'
        >
          <SendIcon style={{ color: 'yellow' }}/>
        </IconButton>
        {/* LOADING*/}
        {loading && <CircularProgress size={34} className={classes.buttonProgress}/>}
      </div>

    </form>
  );

  return <Form validate={validation} onSubmit={onSubmit} render={formContent}/>;
});

export default MailForm;
