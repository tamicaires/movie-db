import { useTheme } from '@/presentation/hooks';
import { FiMoon, FiSun } from 'react-icons/fi';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-surface/30 transition-all duration-200 hover:bg-surface hover:border-border hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95"
      aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
      aria-pressed={theme === 'dark'}
      title={theme === 'light' ? 'Tema claro ativo' : 'Tema escuro ativo'}
    >
      {theme === 'light' ? (
        <FiMoon
          className="h-4 w-4 text-foreground transition-transform hover:rotate-12"
          aria-hidden="true"
        />
      ) : (
        <FiSun
          className="h-4 w-4 text-foreground transition-transform hover:rotate-12"
          aria-hidden="true"
        />
      )}
    </button>
  );
};
