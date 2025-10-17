import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './presentation/contexts';
import { ErrorBoundary } from './presentation/components/common';
import { store } from './presentation/store';
import { routes } from './presentation/routes';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // In production, send to error tracking service (Sentry, Bugsnag, etc.)
        if (import.meta.env.PROD) {
          console.error('Application Error:', error, errorInfo);
          // Example: Sentry.captureException(error, { extra: errorInfo });
        }
      }}
    >
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
