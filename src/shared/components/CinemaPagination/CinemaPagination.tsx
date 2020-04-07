import React from 'react';

import Pagination from '../../../components/Pagination/Pagination';
import './cinemaPagination.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
  prevLink: string | number;
  nextLink: string | number;
  lastPage: string | number;
  currentPage: string | number;
  prev: () => void;
  next: () => void;
}

const CinemaPagination: React.FC<Props> = ({
  children,
  prev,
  next,
  prevLink,
  nextLink,
  lastPage,
  currentPage,
}) => {
  return (
    <div className='cinema-pagination'>
      {/*  Arrow Pagination */}
      <div className='arrow-pagination'>
        <div className='cinema-pagination--nav'>
          {prevLink > 0 && (
            <button
              onClick={prev}
              className='cinema-pagination--btn'
              title='назад'>
              &laquo;
            </button>
          )}
        </div>

        <div className='cinema-pagination--children'>{children}</div>

        <div className='cinema-pagination--nav'>
          {nextLink <= lastPage && (
            <button
              onClick={next}
              className='cinema-pagination--btn'
              title='вперёд'>
              &raquo;
            </button>
          )}
        </div>
      </div>
      {/*  Classic Pagination */}
      <Pagination
        currentPage={Number(currentPage)}
        lastPage={Number(lastPage)}
      />
    </div>
  );
};

export default CinemaPagination;
