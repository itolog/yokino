import { useLocation, useNavigate } from '@reach/router';
import React, { memo, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import './pagination.scss';

const useStyles = makeStyles(() => ({
  '@global': {
    '.MuiPaginationItem-root': {
      color: 'white',
      borderColor: '#9c27b0',
    },
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5% 0',
  },
  li: {
    color: '#70ffdd',
  },
}));

interface IProps {
  currentPage: number;
  lastPage: number;
}

const PaginationClassic: React.FC<IProps> = memo(({ currentPage, lastPage }) => {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentPage > lastPage) {
      navigate(`${location.pathname}?page=${lastPage}`, { replace: true });
    }
  }, [ currentPage, lastPage ]);

  const handleToPage = async (event: React.ChangeEvent<unknown>, value: number) => {
    await navigate(`${location.pathname}?page=${value}`, { replace: true });
  };

  return (
    <div className={classes.root}>
      <Pagination
        color='secondary'
        count={lastPage}
        variant='outlined'
        shape='rounded'
        onChange={handleToPage}
      />
    </div>

  );
});

export default PaginationClassic;