import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  MovieDetails,
  PaginatedMoviesResponse,
  SearchMoviesParams,
  PaginatedParams,
} from '@/shared/types';
import { API_CONFIG } from '@/shared/constants';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      const token = API_CONFIG.API_KEY;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['PopularMovies', 'MovieDetails', 'SearchResults'],

  endpoints: (builder) => ({
    getPopularMovies: builder.query<PaginatedMoviesResponse, PaginatedParams>({
      query: ({ page = 1 }) => ({
        url: '/movie/popular',
        params: { page },
      }),
      providesTags: (result, _error, { page }) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'PopularMovies' as const, id })),
              { type: 'PopularMovies', id: `PAGE-${page}` },
            ]
          : [{ type: 'PopularMovies', id: `PAGE-${page}` }],
    }),

    searchMovies: builder.query<PaginatedMoviesResponse, SearchMoviesParams>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: { query, page },
      }),
      providesTags: (result, _error, { query, page }) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'SearchResults' as const, id })),
              { type: 'SearchResults', id: `${query}-PAGE-${page}` },
            ]
          : [{ type: 'SearchResults', id: `${query}-PAGE-${page}` }],
    }),

    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id) => `/movie/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'MovieDetails', id }],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useLazySearchMoviesQuery,
} = tmdbApi;
