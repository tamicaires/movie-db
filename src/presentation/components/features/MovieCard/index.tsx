import { createContext, useContext } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { MdLocalMovies, MdFavoriteBorder, MdDelete } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import type { Movie } from '@/shared/types';
import { getPosterUrl } from '@/shared/utils/imageUrl';
import { formatDate } from '@/shared/utils/formatters';
import { ROUTES } from '@/shared/constants';
import { useFavorites } from '@/presentation/hooks/useFavorites';
import { HighlightText } from '@/presentation/components/common';

/**
 * Context para compartilhar dados do filme entre subcomponentes
 */
interface MovieCardContextValue {
  movie: Movie;
  posterUrl: string | null;
  isMovieFavorite: boolean;
  handleFavoriteClick: (e: MouseEvent) => void;
}

const MovieCardContext = createContext<MovieCardContextValue | null>(null);

const useMovieCardContext = () => {
  const context = useContext(MovieCardContext);
  if (!context) {
    throw new Error('MovieCard compound components must be used within MovieCard');
  }
  return context;
};

/**
 * Root component - Compound Component Pattern
 */
interface MovieCardRootProps {
  movie: Movie;
  children: ReactNode;
}

const MovieCardRoot = ({ movie, children }: MovieCardRootProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const posterUrl = getPosterUrl(movie.poster_path);
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.preventDefault();
    toggleFavorite(movie);
  };

  const contextValue: MovieCardContextValue = {
    movie,
    posterUrl,
    isMovieFavorite,
    handleFavoriteClick,
  };

  return (
    <MovieCardContext.Provider value={contextValue}>
      <Link
        to={ROUTES.MOVIE_DETAILS.replace(':id', String(movie.id))}
        className="card group relative block overflow-hidden h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg transition-all"
        aria-label={`Ver detalhes de ${movie.title}`}
        data-testid="movie-card"
      >
        {children}
      </Link>
    </MovieCardContext.Provider>
  );
};

/**
 * Poster subcomponent
 */
const Poster = () => {
  const { posterUrl, movie } = useMovieCardContext();

  return (
    <div className="aspect-[2/3] overflow-hidden bg-surface-light">
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={`Poster do filme ${movie.title}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface-light">
          <MdLocalMovies className="h-16 w-16 text-text-secondary" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};

/**
 * Gradient overlay subcomponent
 */
const Gradient = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
  );
};

/**
 * Info overlay subcomponent
 */
interface InfoProps {
  searchQuery?: string;
}

const Info = ({ searchQuery }: InfoProps) => {
  const { movie } = useMovieCardContext();

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 transition-transform group-hover:translate-y-0">
      <h3 className="mb-1 text-lg font-semibold text-white line-clamp-2">
        <HighlightText text={movie.title} highlight={searchQuery} />
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">{formatDate(movie.release_date)}</span>
        <div className="flex items-center gap-1">
          <AiFillStar className="h-4 w-4 text-rating-high" aria-hidden="true" />
          <span className="text-sm font-medium text-white">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Favorite button subcomponent
 */
interface FavoriteButtonProps {
  variant?: 'favorite' | 'delete';
}

const FavoriteButton = ({ variant = 'favorite' }: FavoriteButtonProps) => {
  const { isMovieFavorite, handleFavoriteClick } = useMovieCardContext();

  const showDeleteIcon = variant === 'delete';

  const { movie } = useMovieCardContext();

  return (
    <button
      onClick={handleFavoriteClick}
      className={`absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        showDeleteIcon
          ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/25'
          : isMovieFavorite
            ? 'bg-black/60 hover:bg-black/80'
            : 'bg-black/60 hover:bg-black/80'
      }`}
      aria-label={
        showDeleteIcon
          ? `Remover ${movie.title} dos favoritos`
          : isMovieFavorite
            ? `Remover ${movie.title} dos favoritos`
            : `Adicionar ${movie.title} aos favoritos`
      }
      aria-pressed={isMovieFavorite}
      title={
        showDeleteIcon
          ? 'Remover dos favoritos'
          : isMovieFavorite
            ? 'Remover dos favoritos'
            : 'Adicionar aos favoritos'
      }
    >
      {showDeleteIcon ? (
        <MdDelete className="h-6 w-6 text-white" aria-hidden="true" />
      ) : isMovieFavorite ? (
        <MdFavoriteBorder className="h-6 w-6 text-white" aria-hidden="true" />
      ) : (
        <MdFavoriteBorder className="h-6 w-6 text-white" aria-hidden="true" />
      )}
    </button>
  );
};

/**
 * Compound Component Export
 */
export const MovieCard = Object.assign(MovieCardRoot, {
  Poster,
  Gradient,
  Info,
  FavoriteButton,
});

/**
 * Legacy API - Mantém compatibilidade com código existente
 * Remove depois de migrar todos os usos
 */
interface LegacyMovieCardProps {
  movie: Movie;
  searchQuery?: string;
  showDeleteIcon?: boolean;
}

export const MovieCardLegacy = ({
  movie,
  searchQuery,
  showDeleteIcon = false,
}: LegacyMovieCardProps) => {
  return (
    <MovieCard movie={movie}>
      <MovieCard.Poster />
      <MovieCard.Gradient />
      <MovieCard.Info searchQuery={searchQuery} />
      <MovieCard.FavoriteButton variant={showDeleteIcon ? 'delete' : 'favorite'} />
    </MovieCard>
  );
};
