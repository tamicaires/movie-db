import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './presentation/contexts';
import { store } from './presentation/store';
import { routes } from './presentation/routes';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
