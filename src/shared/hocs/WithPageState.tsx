import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// Store import
import { AppState } from '../../state/createStore';

function withPageState(
  WrappedComponent: React.ComponentType,
): React.ComponentType {
  // STORE PROPS
  const mapStateToProps = (state: AppState) => {
    return {
      movieGenres: state.filter.genre_id,
      movieYear: state.filter.movieYear,
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
