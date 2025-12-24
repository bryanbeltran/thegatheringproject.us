import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Send to error monitoring service if configured
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem 0' }} role="alert">
          <h1>Something went wrong</h1>
          <p>We're sorry, but something unexpected happened.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            className="retry-button"
            aria-label="Return to home page"
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

