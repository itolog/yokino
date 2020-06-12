import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';

import Pagination from './Pagination/Pagination';

interface Props {
  children: JSX.Element[] | JSX.Element;
  lastPage: number;
  currentPage: number;
  setPage: (event: React.ChangeEvent<unknown>, value: number) => void;
  showClassicPagination?: boolean;
}

const useStyles = makeStyles((theme) => ({
  cinemaPagination: {
    position: 'relative',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  cinemaPaginationСhildren: {
    display: 'flex',
    flexFlow: 'wrap',
    width: 'inherit',
    justifyContent: 'center',
    [ theme.breakpoints.down(769) ]: {
      flexFlow: 'column-reverse',
      alignItems: 'center',
    },
  },
}));

const CinemaPagination: React.FC<Props> = memo(
  ({ children, lastPage, currentPage, setPage, showClassicPagination = true }) => {
    const classes = useStyles();
    return (
      <div className={classes.cinemaPagination}>
        {/*  In this place there was arrow pagination. Perhaps in the future return it */}
        <div className={classes.cinemaPaginationСhildren}>{children}</div>
        {/*  In this place there was arrow pagination. Perhaps in the future return it */}
        {showClassicPagination && <Pagination currentPage={currentPage} onChange={setPage} lastPage={lastPage}/>}
      </div>
    );
  },
);

export default CinemaPagination;
