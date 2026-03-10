/**
 * ErrorBoundary Component
 * =======================
 * React error boundary to catch and display render errors gracefully
 */

import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
              <h1 className="text-lg font-bold text-slate-900">Something went wrong</h1>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              La Familia 479 encountered an unexpected error. Please try the following:
            </p>

            <ul className="text-sm text-slate-600 space-y-2 mb-6 list-disc list-inside">
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
              <li>Check that your API keys are configured</li>
              <li>Try again in a few moments</li>
            </ul>

            {this.state.error && (
              <details className="mb-6 bg-slate-50 p-3 rounded-lg">
                <summary className="text-xs font-mono text-slate-500 cursor-pointer hover:text-slate-700">
                  📋 Error Details (click to expand)
                </summary>
                <pre className="text-xs text-slate-600 mt-2 overflow-auto max-h-40 font-mono">
                  {this.state.error.toString()}
                  {this.state.errorInfo && '\n\n' + this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={this.resetError}
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>

            {process.env.NODE_ENV === 'development' && (
              <p className="text-xs text-slate-400 mt-4 text-center">
                💡 You're in development mode. Errors are logged to the browser console for debugging.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
