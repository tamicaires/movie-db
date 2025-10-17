import { MdFavorite } from 'react-icons/md';
import { useFavorites } from '@/presentation/hooks';
import { Container } from '@/presentation/components/layout';
import { MovieGrid } from '@/presentation/components/features';
import { MovieCard } from '@/presentation/components/features';
import { EmptyState, Button } from '@/presentation/components/common';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

export const Favorites = () => {
  const { favorites, sortBy, setSortBy, clearFavorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <Container className="py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Favoritos</h1>
          <p className="mt-2 text-text-secondary">
            {favorites.length === 0
              ? 'Você ainda não tem filmes favoritos'
              : `${favorites.length} ${favorites.length === 1 ? 'filme' : 'filmes'}`}
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex flex-wrap gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-border bg-surface px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="date-desc">Mais recentes</option>
              <option value="date-asc">Mais antigos</option>
              <option value="title-asc">Título (A-Z)</option>
              <option value="title-desc">Título (Z-A)</option>
              <option value="rating-desc">Melhor avaliados</option>
              <option value="rating-asc">Pior avaliados</option>
            </select>

            <Button variant="secondary" onClick={clearFavorites}>
              Limpar todos
            </Button>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<MdFavorite className="h-20 w-20" />}
          title="Nenhum favorito ainda"
          description="Explore filmes populares e adicione seus favoritos aqui"
          action={
            <Button variant="primary" onClick={() => navigate(ROUTES.HOME)}>
              Descobrir filmes
            </Button>
          }
        />
      ) : (
        <MovieGrid>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie}>
              <MovieCard.Poster />
              <MovieCard.Gradient />
              <MovieCard.Info />
              <MovieCard.FavoriteButton variant="delete" />
            </MovieCard>
          ))}
        </MovieGrid>
      )}
    </Container>
  );
};
