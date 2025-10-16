import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { MainLayout } from '@/presentation/components/layout/MainLayout';
import { Home, MovieDetails, Favorites, Search } from '@/presentation/pages';
import { ROUTES } from '@/shared/constants';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.HOME} replace />,
      },
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.MOVIE_DETAILS,
        element: <MovieDetails />,
      },
      {
        path: ROUTES.FAVORITES,
        element: <Favorites />,
      },
      {
        path: ROUTES.SEARCH,
        element: <Search />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.HOME} replace />,
      },
    ],
  },
];
