import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { MdFavorite, MdLocalMovies } from 'react-icons/md';
import { Container } from '../Container';
import { SearchBar } from '@/presentation/components/features';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { ROUTES } from '@/shared/constants';
import { useFavorites } from '@/presentation/hooks/useFavorites';
import { GoHomeFill } from 'react-icons/go';

export const Header = () => {
  const { favorites } = useFavorites();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (location.pathname === ROUTES.SEARCH) {
      const queryFromUrl = searchParams.get('q') || '';
      setSearchQuery(queryFromUrl);
    }
  }, [location.pathname, searchParams]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
              <MdLocalMovies className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground hidden sm:inline">MovieDB</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Buscar filmes..."
                compact
              />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              to={ROUTES.HOME}
              className="text-sm font-medium flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground whitespace-nowrap"
            >
              <GoHomeFill />
              Home
            </Link>
            <Link
              to={ROUTES.FAVORITES}
              className="relative flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground whitespace-nowrap"
            >
              <MdFavorite />
              Favoritos
              {favorites.length > 0 && (
                <span className="absolute -right-4 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  );
};
