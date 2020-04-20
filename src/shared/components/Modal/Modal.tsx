import React, { memo, useState } from 'react';

import CloseBtn from '../../UI/CloseBtn/CloseBtn';

import './modal.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
  titleButton: string;
  onClick?: () => void;
}

const Modal: React.FC<Props> = memo(({ children, titleButton, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

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
    <div className='modal'>
      <button onClick={handleOpen} className='model-open'>
        {titleButton}
      </button>

      {isVisible && (
        <div className='modal-content'>
          <div className={isVisible ? 'showModalContent' : 'hideModalContent'}>
            <div className='modal-close'>
              <CloseBtn onclick={handleClose} />
            </div>

            {isVisible && <>{children}</>}
          </div>
        </div>
      )}
    </div>
  );
});

export default Modal;
