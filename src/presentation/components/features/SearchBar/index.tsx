import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { ROUTES } from '@/shared/constants';

interface SearchBarProps {
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  compact?: boolean;
}

export const SearchBar = ({
  initialValue = '',
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Buscar filmes...',
  compact = false,
}: SearchBarProps) => {
  const [internalQuery, setInternalQuery] = useState(initialValue);
  const navigate = useNavigate();

  const isControlled = controlledValue !== undefined;
  const query = isControlled ? controlledValue : internalQuery;

  useEffect(() => {
    if (!isControlled) {
      setInternalQuery(initialValue);
    }
  }, [initialValue, isControlled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    if (onSearch) {
      onSearch(trimmedQuery);
    } else {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleChange = (newValue: string) => {
    if (isControlled && onChange) {
      onChange(newValue);
    } else {
      setInternalQuery(newValue);
    }
  };

  const handleClear = () => {
    handleChange('');
    if (onSearch) {
      onSearch('');
    }
  };

  const inputClassName = compact
    ? 'block w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder-text-secondary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
    : 'block w-full rounded-lg border border-border bg-surface py-3 pl-10 pr-12 text-foreground placeholder-text-secondary transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';

  const iconSize = compact ? 'h-4 w-4' : 'h-5 w-5';
  const iconPadding = compact ? 'pl-3' : 'pl-3';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 flex items-center ${iconPadding}`}
        >
          <FiSearch className={`${iconSize} text-text-secondary`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className={inputClassName}
        />
        {query && !compact && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary hover:text-foreground"
            aria-label="Clear search"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
};
