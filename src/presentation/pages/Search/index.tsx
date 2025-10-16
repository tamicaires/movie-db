import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useSearchMoviesQuery, tmdbApi } from '@/presentation/store/api/tmdbApi';
import { useDebounce } from '@/presentation/hooks';
import { Container } from '@/presentation/components/layout';
import { SearchBar, MovieGrid, MovieCard } from '@/presentation/components/features';
import { LoadingSpinner, ErrorMessage, EmptyState, Button } from '@/presentation/components/common';
import { useDispatch } from 'react-redux';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, error, refetch } = useSearchMoviesQuery(
    { query: debouncedQuery, page },
    { skip: !debouncedQuery }
  );

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
      setPage(1);
      // Reset cache when search query changes
      dispatch(tmdbApi.util.invalidateTags(['SearchResults']));
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams, dispatch]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-foreground">Buscar Filmes</h1>
        <SearchBar
          initialValue={query}
          onSearch={handleSearch}
          placeholder="Digite o nome do filme..."
        />
      </div>

      {!debouncedQuery ? (
        <EmptyState
          icon={<FiSearch className="h-20 w-20" />}
          title="Faça uma busca"
          description="Digite o nome de um filme para começar a pesquisar"
        />
      ) : (
        <>
          {error && <ErrorMessage message="Erro ao buscar filmes" onRetry={() => refetch()} />}

          {isLoading && page === 1 && <LoadingSpinner />}

          {data && (
            <>
              <div className="mb-6">
                <p className="text-text-secondary">
                  {data.total_results === 0
                    ? `Nenhum resultado encontrado para "${debouncedQuery}"`
                    : `${data.total_results} ${
                        data.total_results === 1 ? 'resultado encontrado' : 'resultados encontrados'
                      } para "${debouncedQuery}"`}
                </p>
              </div>

              {data.results.length > 0 && (
                <>
                  <MovieGrid>
                    {data.results.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} searchQuery={debouncedQuery} />
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
