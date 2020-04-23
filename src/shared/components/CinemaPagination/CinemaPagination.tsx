import React, { memo } from 'react';

import { useNavigate } from '@reach/router';

import Pagination from '../../UI/Pagination/Pagination';
import './cinemaPagination.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
  lastPage: number;
  currentPage: number;
  showClassicPagination?: boolean;
}

const CinemaPagination: React.FC<Props> = memo(
  ({ children, lastPage,currentPage,  showClassicPagination = true }) => {
    const navigate = useNavigate();

    const handleToPage = async (event: React.ChangeEvent<unknown>, value: number) => {
      await navigate(`${location.pathname}?page=${value}`, { replace: true });
    };
    return (
      <div className='cinema-pagination'>
          <div className='cinema-pagination--children'>{children}</div>

        {showClassicPagination && <Pagination currentPage={currentPage} onChange={handleToPage} lastPage={lastPage}/>}
      </div>
    );
  },
);

export default CinemaPagination;
