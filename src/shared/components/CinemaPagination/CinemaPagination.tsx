import React from 'react';

import './cinemaPagination.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
  prevLink: string;
  nextLink: string;
  prev: () => void;
  next: () => void;
}

const CinemaPagination: React.FC<Props> = ({
  children,
  prev,
  next,
  prevLink,
  nextLink,
}) => {
  return (
    <div className='cinema-pagination'>
      {prevLink && (
        <div className='cinema-pagination--nav'>
          <button
            onClick={prev}
            className='cinema-pagination--btn'
            title='назад'
          >
            &laquo;
          </button>
        </div>
      )}

      <div className='cinema-pagination--children'>{children}</div>

      {nextLink && (
        <div className='cinema-pagination--nav'>
          <button
            onClick={next}
            className='cinema-pagination--btn'
            title='вперёд'
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default CinemaPagination;
