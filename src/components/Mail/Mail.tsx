import React, { useRef, useState, memo } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'gatsby';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import MailForm from './MailForm/MailForm';

// STORE
import { isUserLogged } from '../../state/user/selectors';

const Mail = memo(() => {
  const isLogged = useSelector(isUserLogged);

  const arrowRef = useRef<HTMLDivElement>(null);
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div ref={arrowRef}>
      <IconButton aria-label='delete' aria-describedby={id} type='button' onClick={handleClick}>
        <MailTwoToneIcon style={{ color: 'orange' }}/>
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}

        placement='top-end'
        disablePortal={true}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'disabled',
          },
        }}
      >
        {isLogged && <MailForm onClose={handleClick}/>}
        {!isLogged && (
          <Grid item={true}>
            <Box bgcolor='primary.main' color='primary.contrastText' p={2}>
              Войдите в аккаунт.
              <br/>
              <Link to='/auth'>
                <ExitToAppIcon/>
              </Link>
            </Box>
          </Grid>)
        }
      </Popper>
    </div>
  );
});

export default Mail;