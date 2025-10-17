import { useState, useEffect } from 'react';
import { useGetPopularMoviesQuery } from '@/presentation/store/api/tmdbApi';
import { Container } from '@/presentation/components/layout';
import { MovieGrid } from '@/presentation/components/features';
import { MovieCard } from '@/presentation/components/features';
import { LoadingSpinner, ErrorMessage, Button } from '@/presentation/components/common';
import { useDispatch } from 'react-redux';
import { tmdbApi } from '@/presentation/store/api/tmdbApi';
import { BiLoaderAlt } from 'react-icons/bi';

export const Home = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading, error, refetch } = useGetPopularMoviesQuery({ page });

  useEffect(() => {
    return () => {
      dispatch(tmdbApi.util.invalidateTags(['PopularMovies']));
    };
  }, [dispatch]);

  const handleLoadMore = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Container className="py-8">
      {error && (
        <ErrorMessage message="Erro ao carregar filmes" onRetry={() => refetch()} />
      )}

      {isLoading && page === 1 && <LoadingSpinner />}

      {data && (
        <>
          <MovieGrid>
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie}>
                <MovieCard.Poster />
                <MovieCard.Gradient />
                <MovieCard.Info />
                <MovieCard.FavoriteButton />
              </MovieCard>
            ))}
          </MovieGrid>

          {page < data.total_pages && (
            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleLoadMore}
                variant="primary"
                size="lg"
                disabled={isLoading}
                isLoading={isLoading && page > 1}
              >
                {isLoading && page > 1 ? (
                  <span className="flex items-center gap-2">
                    <BiLoaderAlt className="h-5 w-5 animate-spin" />
                    Carregando...
                  </span>
                ) : (
                  'Carregar mais'
                )}
              </Button>
            </div>
          )}

          {data.results.length > 0 && (
            <div className="mt-6 text-center text-sm text-text-secondary">
              Página {page} de {data.total_pages}
            </div>
          )}
        </>
      )}
    </Container>
  );
};
