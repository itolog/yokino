import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// Store import
import { AppState } from '../../state/createStore';
import {
  getMovieGenreState,
  getMovieYearState,
} from '../../state/movie-filter/selectors';

function withPageState(
  WrappedComponent: React.ComponentType,
): React.ComponentType {
  // STORE PROPS
  const mapStateToProps = (state: AppState) => {
    return {
      movieGenres: getMovieGenreState(state),
      movieYear: getMovieYearState(state),
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
