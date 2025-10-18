import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { MdErrorOutline, MdRefresh } from 'react-icons/md';
import { RippleWrapper } from '../RippleEffect';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call optional error handler (can be used for error tracking services)
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-md text-center">
            <RippleWrapper
              className="mb-6 inline-block"
              rippleProps={{
                size: 'xxl',
                color: 'red-600',
                intensity: 'strong',
                rings: 5,
              }}
            >
              <MdErrorOutline className="h-24 w-24 text-red-600" />
            </RippleWrapper>

            <h1 className="mb-4 text-3xl font-bold text-foreground">Oops! Algo deu errado</h1>

            <p className="mb-6 text-text-secondary">
              Ocorreu um erro inesperado. Por favor, tente recarregar a página.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 rounded-lg border border-border bg-surface p-4 text-left">
                <summary className="cursor-pointer font-semibold text-foreground">
                  Detalhes do erro (apenas em desenvolvimento)
                </summary>
                <pre className="mt-4 overflow-auto text-xs text-text-secondary">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <MdRefresh className="mr-2 h-5 w-5" />
                Tentar novamente
              </button>

              <button
                onClick={() => (window.location.href = '/')}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 font-medium text-foreground transition-all hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Voltar para Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
