import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { MainLayout } from '@/presentation/components/layout/MainLayout';
import { LoadingSpinner } from '@/presentation/components/common';
import { ROUTES } from '@/shared/constants';

const Home = lazy(() => import('@/presentation/pages/Home'));
const MovieDetails = lazy(() => import('@/presentation/pages/MovieDetails'));
const Favorites = lazy(() => import('@/presentation/pages/Favorites'));
const Search = lazy(() => import('@/presentation/pages/Search'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    }
  >
    {children}
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.MOVIE_DETAILS,
        element: (
          <SuspenseWrapper>
            <MovieDetails />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.FAVORITES,
        element: (
          <SuspenseWrapper>
            <Favorites />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.SEARCH,
        element: (
          <SuspenseWrapper>
            <Search />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.HOME} replace />,
      },
    ],
  },
];
