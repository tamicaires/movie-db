import { memo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '@/shared/types';
import { MovieCard } from '../MovieCard';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

export type SectionVariant = 'featured' | 'default';

interface MovieSectionProps {
  title: string;
  icon?: ReactNode;
  gradient?: string;
  movies: Movie[];
  isLoading?: boolean;
  viewAllLink?: string;
  variant?: SectionVariant;
}

export const MovieSection = memo(
  ({
    title,
    icon,
    gradient,
    movies,
    isLoading,
    viewAllLink,
    variant = 'default',
  }: MovieSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const isFeatured = variant === 'featured';
    const cardWidth = isFeatured ? 'w-[280px]' : 'w-[160px] sm:w-[180px]';
    const cardHeight = isFeatured ? 'h-[420px]' : 'h-[240px] sm:h-[270px]';
    const skeletonCount = isFeatured ? 4 : 8;
    const displayCount = isFeatured ? 6 : 12;

    const scroll = (direction: 'left' | 'right') => {
      if (!scrollRef.current) return;
      const scrollAmount = isFeatured ? 600 : 400;
      const newPosition =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    };

    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    if (isLoading) {
      return (
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-surface/50 animate-pulse`} />
            <div className={`h-8 w-48 rounded bg-surface/50 animate-pulse`} />
          </div>
          <div className="flex gap-3 overflow-hidden">
            {[...Array(skeletonCount)].map((_, i) => (
              <div
                key={i}
                className={`${cardWidth} ${cardHeight} flex-shrink-0 rounded-lg bg-surface/50 animate-pulse`}
              />
            ))}
          </div>
        </section>
      );
    }

    if (!movies || movies.length === 0) {
      return null;
    }

    return (
      <section className="relative mb-12 -mx-4 px-4 py-6 overflow-hidden group/section">
        <div
          className={`absolute inset-0 bg-gradient-to-t ${gradient || 'from-surface/60 via-surface/30 to-transparent'} pointer-events-none`}
        />

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex items-center justify-center text-foreground/70">
                  <div className="text-xl">{icon}</div>
                </div>
              )}
              <h2 className={`font-bold text-foreground ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
                {title}
              </h2>
            </div>
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                Ver todos
                <MdChevronRight className="text-lg" />
              </Link>
            )}
          </div>

          <div className="relative group">
            {showLeftArrow && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-r from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll left"
              >
                <div className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/20 flex items-center justify-center hover:bg-background hover:scale-110 transition-all shadow-lg">
                  <MdChevronLeft className="text-2xl text-foreground" />
                </div>
              </button>
            )}

            {showRightArrow && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-l from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll right"
              >
                <div className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/20 flex items-center justify-center hover:bg-background hover:scale-110 transition-all shadow-lg">
                  <MdChevronRight className="text-2xl text-foreground" />
                </div>
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-3 overflow-x-scroll scrollbar-hide scroll-smooth pb-4"
            >
              {movies.slice(0, displayCount).map((movie) => (
                <div key={movie.id} className={`${cardWidth} ${cardHeight} flex-shrink-0`}>
                  <MovieCard movie={movie}>
                    <MovieCard.Poster />
                    <MovieCard.Gradient />
                    <MovieCard.Info />
                    <MovieCard.FavoriteButton />
                  </MovieCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

MovieSection.displayName = 'MovieSection';
