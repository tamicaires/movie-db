/**
 * Funções utilitárias para formatação de dados
 * Funções puras (sem side effects) - fáceis de testar
 */

/**
 * Formata data no formato brasileiro (DD/MM/YYYY)
 * @param dateString - Data no formato ISO (YYYY-MM-DD)
 * @returns Data formatada ou string vazia se inválida
 *
 * @example
 * formatDate('2024-03-15') // '15/03/2024'
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('pt-BR').format(date);
  } catch {
    return '';
  }
};

/**
 * Extrai ano de uma data ISO
 * @param dateString - Data no formato ISO (YYYY-MM-DD)
 * @returns Ano como string ou string vazia
 *
 * @example
 * getYear('2024-03-15') // '2024'
 */
export const getYear = (dateString: string): string => {
  if (!dateString) return '';
  return dateString.split('-')[0] || '';
};

/**
 * Formata nota de avaliação para 1 casa decimal
 * @param rating - Nota (0-10)
 * @returns Nota formatada
 *
 * @example
 * formatRating(7.456) // '7.5'
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

/**
 * Formata duração de filme em horas e minutos
 * @param minutes - Duração em minutos
 * @returns String formatada (ex: '2h 30min')
 *
 * @example
 * formatRuntime(150) // '2h 30min'
 * formatRuntime(90)  // '1h 30min'
 * formatRuntime(45)  // '45min'
 */
export const formatRuntime = (minutes: number | null): string => {
  if (!minutes || minutes === 0) return '';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}min`;
};

/**
 * Formata número com separador de milhares
 * @param value - Número a formatar
 * @returns String formatada (ex: '1.234.567')
 *
 * @example
 * formatNumber(1234567) // '1.234.567'
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

/**
 * Formata valor monetário em dólar
 * @param value - Valor em dólares
 * @returns String formatada (ex: '$1,234,567')
 *
 * @example
 * formatCurrency(1234567) // '$1,234,567'
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Trunca texto adicionando reticências
 * @param text - Texto a truncar
 * @param maxLength - Comprimento máximo
 * @returns Texto truncado
 *
 * @example
 * truncateText('Lorem ipsum dolor sit amet', 10) // 'Lorem ipsu...'
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
