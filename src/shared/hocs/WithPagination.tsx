import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// Store import
import { AppState } from '../../state/createStore';
// Filter state
import { Actions as filterActions } from '../../state/movie-filter/actions';
import {
  getMovieCamripState,
  getMovieGenresState,
  getMovieYearState,
} from '../../state/movie-filter/selectors';
import { Actions as paginationActions } from '../../state/pagination/actions';
import { getNextPage } from '../../state/pagination/selectors';

interface IProps {
  toNextPage: (url: string) => void;
}

function withPagination(
  WrappedComponent: React.ComponentType<IProps>
): React.ComponentType<IProps> {
  // STORE PROPS
  const mapStateToProps = (state: AppState) => {
    return {
      nextPage: getNextPage(state),
      // filter state
      movieYear: getMovieYearState(state),
      movieGenres: getMovieGenresState(state),
      movieIsCamrip: getMovieCamripState(state),
    };
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    setNextPage: (payload: string) =>
      dispatch(paginationActions.setNextPage(payload)),
    setMovieYear: (payload: string) =>
      dispatch(filterActions.setMoviesYear(payload)),
  });

  type Props = ReturnType<typeof mapDispatchToProps> &
    ReturnType<typeof mapStateToProps> &
    IProps;

  class WithPagination extends PureComponent<Props, {}> {
    toNextPage = (url: string) => {
      this.props.setNextPage(url);
      window.scrollTo(0, 0);
    };

    render() {
      return <WrappedComponent toNextPage={this.toNextPage} {...this.props} />;
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithPagination);
}

export default withPagination;
