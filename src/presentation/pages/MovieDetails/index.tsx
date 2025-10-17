import { useParams, useNavigate } from 'react-router-dom';
import {
  MdArrowBack,
  MdCalendarToday,
  MdAccessTime,
  MdStar,
  MdFavoriteBorder,
} from 'react-icons/md';
import { useGetMovieDetailsQuery } from '@/presentation/store/api/tmdbApi';
import { useFavorites } from '@/presentation/hooks';
import { Container } from '@/presentation/components/layout';
import { LoadingSpinner, ErrorMessage, Button } from '@/presentation/components/common';
import { getBackdropUrl, getPosterUrl } from '@/shared/utils/imageUrl';
import { formatDate, formatRuntime } from '@/shared/utils/formatters';
import { IoMdHeartDislike } from 'react-icons/io';

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading, error, refetch } = useGetMovieDetailsQuery(Number(id));
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <Container className="py-8">
        <LoadingSpinner />
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container className="py-8">
        <ErrorMessage message="Erro ao carregar detalhes do filme" onRetry={() => refetch()} />
      </Container>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'LARGE');
  const posterUrl = getPosterUrl(movie.poster_path, 'LARGE');
  const isMovieFavorite = isFavorite(movie.id);

  return (
    <div>
      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative h-[400px] w-full">
          <img src={backdropUrl} alt={movie.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}

      <Container className="relative -mt-32 pb-12">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Poster */}
          <div className="flex-shrink-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl md:w-[300px]"
              />
            ) : (
              <div className="flex h-[450px] w-full items-center justify-center rounded-lg bg-surface md:w-[300px]">
                <MdStar className="h-20 w-20 text-text-secondary" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
              <MdArrowBack className="mr-2 h-5 w-5" />
              Voltar
            </Button>

            <h1 className="mb-2 text-4xl font-bold text-foreground">{movie.title}</h1>

            {movie.tagline && <p className="mb-4 italic text-text-secondary">{movie.tagline}</p>}

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-border bg-surface px-4 py-1 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
              {movie.release_date && (
                <div className="flex items-center gap-2">
                  <MdCalendarToday className="h-4 w-4 text-text-secondary" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center gap-2">
                  <MdAccessTime className="h-4 w-4 text-text-secondary" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <MdStar className="h-5 w-5 text-rating-high" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-text-secondary">({movie.vote_count} votos)</span>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">Sinopse</h2>
              <p className="leading-relaxed text-foreground">{movie.overview}</p>
            </div>

            {/* Actions */}
            <div className="mb-8">
              <Button
                variant={isMovieFavorite ? 'danger' : 'primary'}
                onClick={() =>
                  toggleFavorite({
                    ...movie,
                    genre_ids: movie.genres.map((g) => g.id),
                  })
                }
              >
                {isMovieFavorite ? (
                  <IoMdHeartDislike className="mr-2 h-5 w-5" />
                ) : (
                  <MdFavoriteBorder className="mr-2 h-5 w-5" />
                )}
                {isMovieFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default MovieDetails;
