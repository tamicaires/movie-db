import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdSearchOff } from 'react-icons/md';
import { BiLoaderAlt } from 'react-icons/bi';
import { useSearchMoviesQuery, tmdbApi } from '@/presentation/store/api/tmdbApi';
import { Container } from '@/presentation/components/layout';
import { MovieGrid, MovieCard } from '@/presentation/components/features';
import { LoadingSpinner, ErrorMessage, EmptyState, Button } from '@/presentation/components/common';
import { useDispatch } from 'react-redux';
import { useSEO } from '@/presentation/hooks';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useSEO({
    title: query ? `Busca: ${query}` : 'Buscar Filmes',
    description: query ? `Resultados da busca por "${query}"` : 'Busque por seus filmes favoritos',
    keywords: `busca, pesquisa, ${query || 'filmes'}`,
  });

  const { data, isLoading, error, refetch } = useSearchMoviesQuery(
    { query, page },
    { skip: !query || query.length < 3 }
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

  const isQueryTooShort = query.length > 0 && query.length < 3;

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold text-foreground">
        Resultados para <span className="text-yellow-400">"{query}"</span>
      </h1>

      {!query ? (
        <EmptyState
          icon={<MdSearchOff className="h-20 w-20" />}
          title="Faça uma busca"
          description="Use o campo de busca no topo para encontrar filmes"
        />
      ) : isQueryTooShort ? (
        <EmptyState
          icon={<MdSearchOff className="h-16 w-16" />}
          title="Digite pelo menos 3 caracteres"
          description="Continue digitando para ver os resultados da busca"
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
                      {data.total_results} {data.total_results === 1 ? 'filme' : 'filmes'}{' '}
                      {data.total_results === 1 ? 'encontrado' : 'encontrados'}
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
export default Search;
