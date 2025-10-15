/**
 * Rotas da aplicação
 * Centraliza paths para evitar typos e facilitar refatoração
 */

export const ROUTES = {
  HOME: '/',
  MOVIE_DETAILS: '/movie/:id',
  FAVORITES: '/favorites',
  SEARCH: '/search',
} as const;

/**
 * Helper para gerar rota de detalhes do filme
 */
export const getMovieDetailsRoute = (id: number): string => {
  return `/movie/${id}`;
};
