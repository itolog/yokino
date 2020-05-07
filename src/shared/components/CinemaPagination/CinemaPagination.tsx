import React, { memo } from 'react';

import Pagination from '../../UI/Pagination/Pagination';
import './cinemaPagination.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
  lastPage: number;
  currentPage: number;
  setPage: (event: React.ChangeEvent<unknown>, value: number) => void;
  showClassicPagination?: boolean;
}

const CinemaPagination: React.FC<Props> = memo(
  ({ children, lastPage,currentPage, setPage, showClassicPagination = true }) => {
    return (
      <div className='cinema-pagination'>
          <div className='cinema-pagination--children'>{children}</div>

        {showClassicPagination && <Pagination currentPage={currentPage} onChange={setPage} lastPage={lastPage}/>}
      </div>
    );
  },
);

export default CinemaPagination;
