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
      const token = API_CONFIG.READ_TOKEN;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [
    'PopularMovies',
    'MovieDetails',
    'SearchResults',
    'TopRatedMovies',
    'UpcomingMovies',
    'NowPlayingMovies',
  ],

  endpoints: (builder) => ({
    getPopularMovies: builder.query<PaginatedMoviesResponse, PaginatedParams>({
      query: ({ page = 1 }) => ({
        url: '/movie/popular',
        params: { page },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
        currentCache.page = newItems.page;
        currentCache.total_pages = newItems.total_pages;
        currentCache.total_results = newItems.total_results;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'PopularMovies' as const, id })),
              { type: 'PopularMovies', id: 'LIST' },
            ]
          : [{ type: 'PopularMovies', id: 'LIST' }],
    }),

    searchMovies: builder.query<PaginatedMoviesResponse, SearchMoviesParams>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: { query, page },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.query;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
        currentCache.page = newItems.page;
        currentCache.total_pages = newItems.total_pages;
        currentCache.total_results = newItems.total_results;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: (result, _error, { query }) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'SearchResults' as const, id })),
              { type: 'SearchResults', id: `SEARCH-${query}` },
            ]
          : [{ type: 'SearchResults', id: 'LIST' }],
    }),

    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id) => `/movie/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'MovieDetails', id }],
    }),

    getTopRatedMovies: builder.query<PaginatedMoviesResponse, PaginatedParams>({
      query: ({ page = 1 }) => ({
        url: '/movie/top_rated',
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'TopRatedMovies' as const, id })),
              { type: 'TopRatedMovies', id: 'LIST' },
            ]
          : [{ type: 'TopRatedMovies', id: 'LIST' }],
    }),

    getUpcomingMovies: builder.query<PaginatedMoviesResponse, PaginatedParams>({
      query: ({ page = 1 }) => ({
        url: '/movie/upcoming',
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'UpcomingMovies' as const, id })),
              { type: 'UpcomingMovies', id: 'LIST' },
            ]
          : [{ type: 'UpcomingMovies', id: 'LIST' }],
    }),

    getNowPlayingMovies: builder.query<PaginatedMoviesResponse, PaginatedParams>({
      query: ({ page = 1 }) => ({
        url: '/movie/now_playing',
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'NowPlayingMovies' as const, id })),
              { type: 'NowPlayingMovies', id: 'LIST' },
            ]
          : [{ type: 'NowPlayingMovies', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useLazySearchMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} = tmdbApi;
