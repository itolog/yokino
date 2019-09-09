import React from 'react';

interface Props {
  children: React.ReactNode;
  val: any;
}

const IsEmpty: React.FC<Props> = ({ children, val }) => {
  if (val !== null && val !== '' && val !== 0 && val !== '0') {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default IsEmpty;
