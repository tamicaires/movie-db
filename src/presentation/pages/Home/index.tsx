import { useState, useEffect, useMemo } from 'react';
import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} from '@/presentation/store/api/tmdbApi';
import { Container } from '@/presentation/components/layout';
import { MovieGrid, MovieSection } from '@/presentation/components/features';
import { MovieCard } from '@/presentation/components/features';
import { LoadingSpinner, ErrorMessage, Button } from '@/presentation/components/common';
import { useDispatch } from 'react-redux';
import { tmdbApi } from '@/presentation/store/api/tmdbApi';
import { useViewMode, useSEO } from '@/presentation/hooks';
import { BiLoaderAlt } from 'react-icons/bi';
import { RiMovie2Fill, RiFireFill, RiStarSFill, RiCalendarEventFill } from 'react-icons/ri';

export const Home = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { viewMode } = useViewMode();

  useSEO({
    title: 'Filmes Populares',
    description:
      'Explore os filmes mais populares do momento, descubra novos lançamentos e aclamados pela crítica.',
    keywords: 'filmes populares, movies, cinema, TMDB, em alta, lançamentos',
  });

  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
    refetch: refetchPopular,
  } = useGetPopularMoviesQuery({ page });

  const { data: topRatedData, isLoading: topRatedLoading } = useGetTopRatedMoviesQuery(
    { page: 1 },
    { skip: viewMode === 'simple' }
  );

  const { data: upcomingData, isLoading: upcomingLoading } = useGetUpcomingMoviesQuery(
    { page: 1 },
    { skip: viewMode === 'simple' }
  );

  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useGetNowPlayingMoviesQuery(
    { page: 1 },
    { skip: viewMode === 'simple' }
  );

  useEffect(() => {
    return () => {
      dispatch(tmdbApi.util.invalidateTags(['PopularMovies']));
    };
  }, [dispatch]);

  const handleLoadMore = () => {
    if (popularData && page < popularData.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  const isAdvancedLoading = useMemo(
    () => topRatedLoading || upcomingLoading || nowPlayingLoading || popularLoading,
    [topRatedLoading, upcomingLoading, nowPlayingLoading, popularLoading]
  );

  if (viewMode === 'advanced') {
    return (
      <Container className="py-8">
        {popularError && (
          <ErrorMessage message="Erro ao carregar filmes" onRetry={() => refetchPopular()} />
        )}

        {isAdvancedLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            {nowPlayingData && (
              <MovieSection
                title="Em Cartaz"
                icon={<RiMovie2Fill />}
                gradient="from-surface via-surface/70 to-surface/40"
                movies={nowPlayingData.results}
                isLoading={nowPlayingLoading}
                variant="featured"
              />
            )}

            {popularData && (
              <MovieSection
                title="Em Alta"
                icon={<RiFireFill />}
                gradient="from-surface/90 via-surface/60 to-surface/30"
                movies={popularData.results}
                isLoading={popularLoading}
                variant="default"
              />
            )}

            {topRatedData && (
              <MovieSection
                title="Aclamados pela Crítica"
                icon={<RiStarSFill />}
                gradient="from-surface/80 via-surface/50 to-transparent"
                movies={topRatedData.results}
                isLoading={topRatedLoading}
                variant="default"
              />
            )}

            {upcomingData && (
              <MovieSection
                title="Próximos Lançamentos"
                icon={<RiCalendarEventFill />}
                gradient="from-surface/70 via-surface/40 to-transparent"
                movies={upcomingData.results}
                isLoading={upcomingLoading}
                variant="default"
              />
            )}
          </div>
        )}
      </Container>
    );
  }

  return (
    <Container className="py-8">
      {popularError && (
        <ErrorMessage message="Erro ao carregar filmes" onRetry={() => refetchPopular()} />
      )}

      {popularLoading && page === 1 && <LoadingSpinner />}

      {popularData && (
        <>
          <MovieGrid>
            {popularData.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie}>
                <MovieCard.Poster />
                <MovieCard.Gradient />
                <MovieCard.Info />
                <MovieCard.FavoriteButton />
              </MovieCard>
            ))}
          </MovieGrid>

          {page < popularData.total_pages && (
            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleLoadMore}
                variant="primary"
                size="lg"
                disabled={popularLoading}
                isLoading={popularLoading && page > 1}
              >
                {popularLoading && page > 1 ? (
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

          {popularData.results.length > 0 && (
            <div className="mt-6 text-center text-sm text-text-secondary">
              Página {page} de {popularData.total_pages}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
