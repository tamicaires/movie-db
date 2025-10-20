import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiX, HiViewGrid, HiViewList } from 'react-icons/hi';
import { GoHomeFill } from 'react-icons/go';
import { MdFavorite } from 'react-icons/md';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { ROUTES } from '@/shared/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isActiveRoute: (path: string) => boolean;
  favoritesCount: number;
  isHomePage: boolean;
  viewMode: 'simple' | 'advanced';
  onToggleViewMode: () => void;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  isActiveRoute,
  favoritesCount,
  isHomePage,
  viewMode,
  onToggleViewMode,
}: MobileMenuProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed top-0 right-0 bottom-0 z-[110] w-72 bg-background border-l border-border shadow-2xl md:hidden animate-slide-in-from-right"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 className="text-lg font-bold text-foreground">Menu</h2>
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Fechar menu"
            >
              <HiX className="h-6 w-6 text-foreground" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <Link
                to={ROUTES.HOME}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-200 group
                  ${
                    isActiveRoute(ROUTES.HOME)
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-foreground/70 hover:text-foreground hover:bg-surface/50'
                  }
                `}
                aria-current={isActiveRoute(ROUTES.HOME) ? 'page' : undefined}
              >
                <GoHomeFill
                  className={`text-xl transition-transform group-hover:scale-110 ${
                    isActiveRoute(ROUTES.HOME) ? 'text-white' : 'text-primary'
                  }`}
                  aria-hidden="true"
                />
                <span>Home</span>
              </Link>

              <Link
                to={ROUTES.FAVORITES}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-200 group relative
                  ${
                    isActiveRoute(ROUTES.FAVORITES)
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-foreground/70 hover:text-foreground hover:bg-surface/50'
                  }
                `}
                aria-current={isActiveRoute(ROUTES.FAVORITES) ? 'page' : undefined}
              >
                <MdFavorite
                  className={`text-xl transition-transform group-hover:scale-110 ${
                    isActiveRoute(ROUTES.FAVORITES) ? 'text-white' : 'text-red-500'
                  }`}
                  aria-hidden="true"
                />
                <span className="flex-1">Favoritos</span>
                {favoritesCount > 0 && (
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md"
                    aria-label={`${favoritesCount} favoritos`}
                  >
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wide mb-3 px-4">
                Configurações
              </p>

              <div className="space-y-2">
                {isHomePage && (
                  <button
                    onClick={() => {
                      onToggleViewMode();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-surface/50 transition-all duration-200 group"
                  >
                    {viewMode === 'simple' ? (
                      <>
                        <HiViewGrid
                          className="text-xl text-primary transition-transform group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <span>Visualização Avançada</span>
                      </>
                    ) : (
                      <>
                        <HiViewList
                          className="text-xl text-primary transition-transform group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <span>Visualização Simples</span>
                      </>
                    )}
                  </button>
                )}

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-foreground/70">Tema</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-border/50 bg-surface/30">
            <p className="text-xs text-center text-foreground/50">
              <span className="font-bold">Movie</span>
              <span className="font-light">DB</span> - Seu catálogo de filmes
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
