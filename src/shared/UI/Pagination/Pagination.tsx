import { useNavigate } from '@reach/router';
import React, { memo,  useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import './pagination.scss';

const useStyles = makeStyles(() => ({
  '@global': {
    '.MuiPaginationItem-root': {
      color: 'white',
      borderColor: '#9c27b0',
      '&:hover': {
        background: '#9c27b0',
      }
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
  lastPage: number;
  currentPage: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationClassic: React.FC<IProps> = memo(({ onChange, lastPage, currentPage }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Last Page
    if (currentPage > lastPage) {
      (async () => {
        await  navigate(`${location.pathname}?page=${lastPage}`, { replace: true });
      })();
    }
  }, [currentPage, lastPage]);

  return (
    <div className={classes.root}>
      <Pagination
        color='secondary'
        count={lastPage}
        variant='outlined'
        shape='rounded'
        onChange={onChange}
        page={currentPage}
        disabled={lastPage === 1}
      />
    </div>

  );
});

export default PaginationClassic;