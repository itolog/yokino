import React, { ErrorInfo } from 'react';

import './style.scss';

interface Props {
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ ...this.state, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-container'>
          <h2 className='error-container--title'>Что-то пошло не так.</h2>
          <p className='error-container--message'>{this?.state?.error?.message}</p>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;