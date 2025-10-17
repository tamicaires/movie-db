import { useTheme } from '@/presentation/hooks';
import { FiMoon, FiSun } from 'react-icons/fi';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:border border-border  transition-colors hover:bg-surface-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon className="h-4 w-4 text-foreground" />
      ) : (
        <FiSun className="h-4 w-4 text-foreground" />
      )}
    </button>
  );
};
