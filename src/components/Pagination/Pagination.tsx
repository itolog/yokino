import { useLocation, useNavigate } from '@reach/router';
import { Link } from 'gatsby';
import React, { useEffect } from 'react';

import './pagination.scss';

interface Props {
  currentPage: number;
  lastPage: number;
}

const Pagination: React.FC<Props> = ({ currentPage, lastPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentPage > lastPage) {
      navigate(`${location.pathname}?page=${lastPage}`, { replace: true });
    }
  }, [currentPage, lastPage]);

  return (
    <ul className='classic-pagination'>
      {/* First page */}
      {currentPage > 1 && (
        <li>
          <Link className='pagination-item' to={`${location.pathname}?page=1`}>
            1
          </Link>
        </li>
      )}
      {currentPage > 2 && (
        <li>
          <Link
            className='pagination-item'
            to={`${location.pathname}?page=${currentPage - 1}`}>
            {currentPage - 1 || '...'}
          </Link>
        </li>
      )}
      {/* Current page */}
      <li>
        <Link
          className='pagination-item pagination-item__disabled'
          to={`${location.pathname}?page=${currentPage}`}>
          {currentPage || '...'}
        </Link>
      </li>
      {/* Next page */}
      {currentPage !== lastPage - 1 && currentPage !== lastPage && (
        <li>
          <Link
            className='pagination-item'
            to={`${location.pathname}?page=${currentPage + 1}`}>
            {currentPage + 1 || '...'}
          </Link>
        </li>
      )}
      {/* Last page */}
      {currentPage !== lastPage && (
        <li>
          <Link
            className='pagination-item'
            to={`${location.pathname}?page=${lastPage}`}>
            {lastPage || '...'}
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
