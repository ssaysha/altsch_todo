import React, { ReactNode, ErrorInfo } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // Update state when an error is thrown
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Log error details
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center mt-20 p-4">
          <h1 className="text-4xl font-bold mb-4 text-red-600">
            Something went wrong
          </h1>

          <p className="text-gray-700 mb-4">
            Please try refreshing the page or contact support.
          </p>

          {/* Show error message in development */}
          {import.meta.env.DEV && this.state.error && (
            <pre className="bg-gray-100 p-2 rounded text-sm text-red-500">
              {this.state.error.toString()}
            </pre>
          )}

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;