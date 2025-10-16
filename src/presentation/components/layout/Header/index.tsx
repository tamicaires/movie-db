import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { Container } from '../Container';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { ROUTES } from '@/shared/constants';
import { useFavorites } from '@/presentation/hooks/useFavorites';

export const Header = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
              <MdLocalMovies className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground hidden sm:inline">MovieDB</span>
            </Link>

            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link
                to={ROUTES.HOME}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground whitespace-nowrap"
              >
                Populares
              </Link>
              <Link
                to={ROUTES.SEARCH}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground whitespace-nowrap"
              >
                Pesquisar
              </Link>
              <Link
                to={ROUTES.FAVORITES}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground whitespace-nowrap"
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

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="h-4 w-4 text-text-secondary" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar filmes..."
                  className="block w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder-text-secondary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};
