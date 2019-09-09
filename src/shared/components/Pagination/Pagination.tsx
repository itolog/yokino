import { Link } from 'gatsby';
import React from 'react';

import './pagination.scss';

interface Props {
  current_page: number;
  dataCount: number;
}

const Pagination: React.FC<Props> = ({ current_page, dataCount }) => {
  return (
    <>
      <div className="pagination">
        {current_page >= 3 && (
          <Link
            to={`/?page=${1}`}
            className="pagination-item pagination-item__begin"
          >
            начало
          </Link>
        )}

        {current_page !== 1 && (
          <Link to={`/?page=${current_page - 1}`} className="pagination-item">
            {current_page - 1}
          </Link>
        )}
        {current_page && (
          <Link
            to={`/?page=${current_page}`}
            className="pagination-item pagination-item__disabled"
          >
            {current_page}
          </Link>
        )}

        {dataCount && (
          <Link to={`?page=${current_page + 1}`} className="pagination-item">
            {current_page + 1}
          </Link>
        )}
      </div>
    </>
  );
};

export default Pagination;
