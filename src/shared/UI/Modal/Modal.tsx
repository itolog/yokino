import React, { memo, useState } from 'react';

import CloseBtn from '../CloseBtn/CloseBtn';

import useStyles from './styles';

interface Props {
  children: JSX.Element[] | JSX.Element;
  titleButton: string;
  onClick?: () => void;
  styleOpenBtn?: string;
}

const Modal: React.FC<Props> = memo(({ children, titleButton, onClick, styleOpenBtn }) => {
  const classes = useStyles();

  const [ isVisible, setIsVisible ] = useState(false);

  const handleOpen = () => {
    setIsVisible(true);
    if (onClick) {
      onClick();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={classes.modal}>
      <button onClick={handleOpen} className={styleOpenBtn}>
        {titleButton}
      </button>

      {isVisible && (
        <div className={classes.modalContent}>
          <div className={isVisible ? `${classes.showModalContent}` : `${classes.hideModalContent}`}>
            <div className={classes.modalClose}>
              <CloseBtn onclick={handleClose}/>
            </div>

            {isVisible && <>{children}</>}
          </div>
        </div>
      )}
    </div>
  );
});

export default Modal;
