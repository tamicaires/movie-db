/**
 * Configurações da API do TMDB
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  READ_TOKEN: import.meta.env.VITE_TMDB_READ_TOKEN || '',
  IMAGE_BASE_URL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
} as const;

/**
 * Tamanhos de imagem disponíveis na API do TMDB
 * Doc: https://developers.themoviedb.org/3/getting-started/images
 */
export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
} as const;

/**
 * Endpoints da API
 */
export const API_ENDPOINTS = {
  POPULAR_MOVIES: '/movie/popular',
  SEARCH_MOVIES: '/search/movie',
  MOVIE_DETAILS: '/movie',
} as const;

/**
 * Query keys para React Query / RTK Query
 * Facilita invalidação de cache
 */
export const QUERY_KEYS = {
  POPULAR_MOVIES: 'popularMovies',
  SEARCH_MOVIES: 'searchMovies',
  MOVIE_DETAILS: 'movieDetails',
} as const;

/**
 * Chave para armazenamento local
 */
export const STORAGE_KEYS = {
  FAVORITES: 'tmdb_favorites',
  VIEW_MODE: 'tmdb_view_mode',
} as const;
