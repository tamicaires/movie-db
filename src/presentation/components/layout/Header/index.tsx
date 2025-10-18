import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { MdFavorite, MdMovieFilter } from 'react-icons/md';
import { HiViewGrid, HiViewList } from 'react-icons/hi';
import { Container } from '../Container';
import { SearchBar } from '@/presentation/components/features';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { ROUTES } from '@/shared/constants';
import { useFavorites } from '@/presentation/hooks/useFavorites';
import { useViewMode } from '@/presentation/hooks';
import { GoHomeFill } from 'react-icons/go';

export const Header = () => {
  const { favorites } = useFavorites();
  const { viewMode, toggle } = useViewMode();
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
  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-black/5">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-2 flex-shrink-0 group"
              aria-label="Ir para página inicial"
            >
              <div className="relative">
                <MdMovieFilter
                  className="h-7 w-7 text-yellow-500 transition-transform group-hover:scale-110 group-hover:rotate-12"
                  aria-hidden="true"
                />
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
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                ${
                  isActiveRoute(ROUTES.HOME)
                    ? 'bg-primary text-white'
                    : 'text-foreground/70 hover:text-foreground hover:bg-surface/50'
                }
              `}
              aria-label="Ir para Home"
              aria-current={isActiveRoute(ROUTES.HOME) ? 'page' : undefined}
            >
              <GoHomeFill className="text-base" aria-hidden="true" />
              Home
            </Link>
            <Link
              to={ROUTES.FAVORITES}
              className={`
                relative flex items-center gap-2 px-3 py-2 rounded-lg
                text-sm font-medium transition-all duration-200 whitespace-nowrap
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                ${
                  isActiveRoute(ROUTES.FAVORITES)
                    ? 'bg-primary text-white'
                    : 'text-foreground/70 hover:text-foreground hover:bg-surface/50'
                }
              `}
              aria-label={`Ir para Favoritos${favorites.length > 0 ? ` (${favorites.length} filmes)` : ''}`}
              aria-current={isActiveRoute(ROUTES.FAVORITES) ? 'page' : undefined}
            >
              <MdFavorite className="text-base" aria-hidden="true" />
              Favoritos
              {favorites.length > 0 && (
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg shadow-primary/50 animate-pulse"
                  aria-hidden="true"
                >
                  {favorites.length}
                </span>
              )}
            </Link>
            <div className="ml-2 pl-2 border-l border-border/50 flex items-center gap-2">
              {isHomePage && (
                <button
                  onClick={toggle}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-surface/30 transition-all duration-200 hover:bg-surface hover:border-border hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95"
                  aria-label="Toggle view mode"
                  title={viewMode === 'simple' ? 'Visualização Avançada' : 'Visualização Simples'}
                >
                  {viewMode === 'simple' ? (
                    <HiViewGrid
                      className="h-5 w-5 text-foreground transition-transform hover:rotate-12"
                      aria-hidden="true"
                    />
                  ) : (
                    <HiViewList
                      className="h-5 w-5 text-foreground transition-transform hover:rotate-12"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )}
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};
