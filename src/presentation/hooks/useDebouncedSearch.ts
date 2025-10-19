import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { ROUTES } from '@/shared/constants';

const MIN_SEARCH_LENGTH = 3;

export const useDebouncedSearch = (query: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedQuery = useDebounce(query, 500);
  const prevQueryRef = useRef('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevQueryRef.current = debouncedQuery;
      return;
    }

    const trimmedQuery = debouncedQuery.trim();
    const currentUrlQuery = new URLSearchParams(location.search).get('q') || '';

    const shouldNavigate =
      trimmedQuery !== prevQueryRef.current &&
      trimmedQuery !== currentUrlQuery &&
      trimmedQuery.length >= MIN_SEARCH_LENGTH;

    if (shouldNavigate) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(trimmedQuery)}`);
    }

    prevQueryRef.current = trimmedQuery;
  }, [debouncedQuery, navigate, location.search, location.pathname]);
};
