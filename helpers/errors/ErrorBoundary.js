import React from "react";
import ScreenFallbackDev from "../../src/ui/fallback/screenFallbackDev";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });

    // Use this.setState to update the state
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ScreenFallbackDev error={JSON.stringify(this.state.error)} />;
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
