import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// Store import
import { AppState } from '../../state/createStore';
import {
  getMovieCamripState,
  getMovieGenresState,
  getMovieYearState,
} from '../../state/movie-filter/selectors';
import { getNextPage } from '../../state/pagination/selectors';

function withPageState(
  WrappedComponent: React.ComponentType
): React.ComponentType {
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

  type Props = ReturnType<typeof mapStateToProps>;
  class WithPageState extends PureComponent<Props, {}> {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(mapStateToProps)(WithPageState);
}

export default withPageState;
