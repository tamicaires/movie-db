import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useSearchMoviesQuery, tmdbApi } from '@/presentation/store/api/tmdbApi';
import { Container } from '@/presentation/components/layout';
import { MovieGrid, MovieCard } from '@/presentation/components/features';
import { LoadingSpinner, ErrorMessage, EmptyState, Button } from '@/presentation/components/common';
import { useDispatch } from 'react-redux';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useSearchMoviesQuery(
    { query, page },
    { skip: !query }
  );

  useEffect(() => {
    setPage(1);
    if (query) {
      dispatch(tmdbApi.util.invalidateTags(['SearchResults']));
    }
  }, [query, dispatch]);

  const handleLoadMore = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Resultados da Busca</h1>
        {query && (
          <p className="mt-2 text-text-secondary">
            Buscando por: <span className="font-medium text-foreground">"{query}"</span>
          </p>
        )}
      </div>

      {!query ? (
        <EmptyState
          icon={<FiSearch className="h-20 w-20" />}
          title="Faça uma busca"
          description="Use o campo de busca no topo para encontrar filmes"
        />
      ) : (
        <>
          {error && <ErrorMessage message="Erro ao buscar filmes" onRetry={() => refetch()} />}

          {isLoading && page === 1 && <LoadingSpinner />}

          {data && (
            <>
              <div className="mb-6">
                <p className="text-text-secondary">
                  {data.total_results === 0 ? (
                    <>
                      Nenhum resultado encontrado para{' '}
                      <span className="font-medium text-primary">"{query}"</span>
                    </>
                  ) : (
                    <>
                      {data.total_results} {data.total_results === 1 ? 'resultado' : 'resultados'}{' '}
                      {data.total_results === 1 ? 'encontrado' : 'encontrados'} para{' '}
                      <span className="font-medium text-primary">"{query}"</span>
                    </>
                  )}
                </p>
              </div>

              {data.results.length > 0 && (
                <>
                  <MovieGrid>
                    {data.results.map((movie) => (
                      <MovieCard key={movie.id} movie={movie}>
                        <MovieCard.Poster />
                        <MovieCard.Gradient />
                        <MovieCard.Info searchQuery={query} />
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
                        {isLoading && page > 1 ? 'Carregando...' : 'Carregar mais'}
                      </Button>
                    </div>
                  )}

                  {data.total_pages > 1 && (
                    <div className="mt-6 text-center text-sm text-text-secondary">
                      Página {page} de {data.total_pages}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};
