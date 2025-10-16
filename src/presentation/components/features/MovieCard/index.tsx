import { Link } from 'react-router-dom';
import { MdLocalMovies, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { Movie } from '@/shared/types';
import { getPosterUrl } from '@/shared/utils/imageUrl';
import { formatDate } from '@/shared/utils/formatters';
import { ROUTES } from '@/shared/constants';
import { useFavorites } from '@/presentation/hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const posterUrl = getPosterUrl(movie.poster_path);
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <Link
      to={ROUTES.MOVIE_DETAILS.replace(':id', String(movie.id))}
      className="card group relative overflow-hidden transition-transform hover:scale-105"
    >
      <div className="aspect-[2/3] overflow-hidden bg-surface-light">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-light">
            <MdLocalMovies className="h-16 w-16 text-text-secondary" />
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 transition-transform group-hover:translate-y-0">
        <h3 className="mb-1 text-lg font-semibold text-white line-clamp-2">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">{formatDate(movie.release_date)}</span>
          <div className="flex items-center gap-1">
            <AiFillStar className="h-4 w-4 text-rating-high" />
            <span className="text-sm font-medium text-white">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleFavoriteClick}
        className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-colors hover:bg-black/80"
        aria-label={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isMovieFavorite ? (
          <MdFavorite className="h-6 w-6 text-accent-red" />
        ) : (
          <MdFavoriteBorder className="h-6 w-6 text-white" />
        )}
      </button>
    </Link>
  );
};
