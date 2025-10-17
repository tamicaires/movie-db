import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { MdFavorite, MdMovieFilter } from 'react-icons/md';
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

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-black/5">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0 group">
              <div className="relative">
                <MdMovieFilter className="h-7 w-7 text-yellow-500 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl hidden sm:inline">
                <span className="font-extrabold">Movie</span>
                <span className="font-light">DB</span>
              </span>
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
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            <Link
              to={ROUTES.HOME}
              className={`
                text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg
                transition-all duration-200 whitespace-nowrap
                ${
                  isActiveRoute(ROUTES.HOME)
                    ? 'bg-primary text-white'
                    : 'text-foreground/70 hover:text-foreground hover:bg-surface/50'
                }
              `}
            >
              <GoHomeFill className="text-base" />
              Home
            </Link>
            <Link
              to={ROUTES.FAVORITES}
              className={`
                relative flex items-center gap-2 px-3 py-2 rounded-lg
                text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${
                  isActiveRoute(ROUTES.FAVORITES)
                    ? 'bg-primary text-white'
                    : 'text-foreground/70 hover:text-foreground hover:bg-surface/50'
                }
              `}
            >
              <MdFavorite className="text-base" />
              Favoritos
              {favorites.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg shadow-primary/50 animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>
            <div className="ml-2 pl-2 border-l border-border/50">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};
