import { Link } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { Container } from '../Container';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { ROUTES } from '@/shared/constants';
import { useFavorites } from '@/presentation/hooks/useFavorites';

export const Header = () => {
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <MdLocalMovies className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">MovieDB</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to={ROUTES.HOME}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                Populares
              </Link>
              <Link
                to={ROUTES.SEARCH}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                Pesquisar
              </Link>
              <Link
                to={ROUTES.FAVORITES}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                Favoritos
                {favorites.length > 0 && (
                  <span className="absolute -right-4 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};
