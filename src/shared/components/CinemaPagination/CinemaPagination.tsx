import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../../state/createStore';
import { getMovieCamripState } from '../../../state/movie-filter/selectors';

import './cinemaPagination.scss';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  prevLink: string;
  nextLink: string;
  lastPage: string;
  prev: () => void;
  next: () => void;
}

const mapStateToProps = (state: AppState) => {
  return {
    isCamrip: getMovieCamripState(state),
  };
};

type Props = ReturnType<typeof mapStateToProps> & IProps;

const CinemaPagination: React.FC<Props> = ({
  children,
  prev,
  next,
  prevLink,
  nextLink,
  lastPage,
}) => {
  return (
    <div className='cinema-pagination'>
      <div className='cinema-pagination--nav'>
        {prevLink !== '0' && (
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
  );
};

export default connect(mapStateToProps)(CinemaPagination);
