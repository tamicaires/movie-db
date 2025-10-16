/**
 * Tipos relacionados a filmes e API do TMDB
 * Baseado na documentação: https://developers.themoviedb.org/3
 */

/**
 * Filme básico retornado pela API do TMDB
 * Usado em listas (popular, search)
 */
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
}

/**
 * Gênero de filme
 */
export interface Genre {
  id: number;
  name: string;
}

/**
 * Detalhes completos de um filme
 * Retornado pelo endpoint /movie/{id}
 */
export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

/**
 * Empresa de produção
 */
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

/**
 * País de produção
 */
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

/**
 * Idioma falado no filme
 */
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/**
 * Resposta paginada da API do TMDB
 * Usada em /movie/popular e /search/movie
 */
export interface PaginatedMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Tipo para ordenação de favoritos
 */
export type FavoriteSortBy =
  | 'title-asc'
  | 'title-desc'
  | 'rating-asc'
  | 'rating-desc'
  | 'date-asc'
  | 'date-desc';

/**
 * Parâmetros para busca de filmes
 */
export interface SearchMoviesParams {
  query: string;
  page?: number;
}

/**
 * Parâmetros para listagem paginada
 */
export interface PaginatedParams {
  page?: number;
}
