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
          <div className='cinema-pagination--children'>{children}</div>

        {showClassicPagination && <Pagination currentPage={currentPage} lastPage={lastPage}/>}
      </div>
    );
  },
);

export default CinemaPagination;
