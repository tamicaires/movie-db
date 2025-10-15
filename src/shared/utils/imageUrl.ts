/**
 * Utilitários para construção de URLs de imagens do TMDB
 */

import { API_CONFIG, IMAGE_SIZES } from '@/shared/constants';

/**
 * Constrói URL completa para poster de filme
 * @param posterPath - Path do poster retornado pela API
 * @param size - Tamanho desejado (padrão: medium)
 * @returns URL completa ou null se path inválido
 *
 * @example
 * getPosterUrl('/abc123.jpg') // 'https://image.tmdb.org/t/p/w342/abc123.jpg'
 */
export const getPosterUrl = (
  posterPath: string | null,
  size: keyof typeof IMAGE_SIZES.POSTER = 'MEDIUM'
): string | null => {
  if (!posterPath) return null;

  const sizeValue = IMAGE_SIZES.POSTER[size];
  return `${API_CONFIG.IMAGE_BASE_URL}/${sizeValue}${posterPath}`;
};

/**
 * Constrói URL completa para backdrop de filme
 * @param backdropPath - Path do backdrop retornado pela API
 * @param size - Tamanho desejado (padrão: large)
 * @returns URL completa ou null se path inválido
 *
 * @example
 * getBackdropUrl('/xyz789.jpg') // 'https://image.tmdb.org/t/p/w1280/xyz789.jpg'
 */
export const getBackdropUrl = (
  backdropPath: string | null,
  size: keyof typeof IMAGE_SIZES.BACKDROP = 'LARGE'
): string | null => {
  if (!backdropPath) return null;

  const sizeValue = IMAGE_SIZES.BACKDROP[size];
  return `${API_CONFIG.IMAGE_BASE_URL}/${sizeValue}${backdropPath}`;
};

/**
 * URL de placeholder para quando não há imagem disponível
 * Utiliza serviço placeholder.com
 */
export const PLACEHOLDER_IMAGE = {
  POSTER: 'https://via.placeholder.com/342x513/1f2937/9ca3af?text=No+Poster',
  BACKDROP: 'https://via.placeholder.com/1280x720/1f2937/9ca3af?text=No+Image',
} as const;

/**
 * Retorna URL do poster ou placeholder se não existir
 * @param posterPath - Path do poster
 * @param size - Tamanho desejado
 * @returns URL do poster ou placeholder
 */
export const getPosterUrlOrPlaceholder = (
  posterPath: string | null,
  size: keyof typeof IMAGE_SIZES.POSTER = 'MEDIUM'
): string => {
  return getPosterUrl(posterPath, size) || PLACEHOLDER_IMAGE.POSTER;
};

/**
 * Retorna URL do backdrop ou placeholder se não existir
 * @param backdropPath - Path do backdrop
 * @param size - Tamanho desejado
 * @returns URL do backdrop ou placeholder
 */
export const getBackdropUrlOrPlaceholder = (
  backdropPath: string | null,
  size: keyof typeof IMAGE_SIZES.BACKDROP = 'LARGE'
): string => {
  return getBackdropUrl(backdropPath, size) || PLACEHOLDER_IMAGE.BACKDROP;
};
