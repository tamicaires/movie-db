import { useTheme } from '@/presentation/hooks';
import { FiMoon, FiSun } from 'react-icons/fi';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-colors hover:bg-surface-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon className="h-5 w-5 text-foreground" />
      ) : (
        <FiSun className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
};
