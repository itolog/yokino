import React, { memo } from 'react';

import Pagination from '../../../components/Pagination/Pagination';
import './cinemaPagination.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
  prevLink: number;
  nextLink: number;
  lastPage: number;
  currentPage: number;
  prev: () => void;
  next: () => void;
  showClassicPagination?: boolean;
}

const CinemaPagination: React.FC<Props> = memo(
  ({ children, prev, next, prevLink, nextLink, lastPage, currentPage, showClassicPagination = true }) => {
    return (
      <div className='cinema-pagination'>
        {/*  Arrow Pagination */}
        <div className='arrow-pagination'>
          <div className='cinema-pagination--nav'>
            {prevLink > 0 && (
              <button
                onClick={prev}
                className='cinema-pagination--btn'
                title='назад'
              >
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
                title='вперёд'
              >
                &raquo;
              </button>
            )}
          </div>
        </div>
        {/*  Classic Pagination */}
        {showClassicPagination && <Pagination currentPage={currentPage} lastPage={lastPage}/>}
      </div>
    );
  },
);

export default CinemaPagination;
