import type { ReactNode } from 'react';

interface MovieGridProps {
  children: ReactNode;
}

export const MovieGrid = ({ children }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {children}
    </div>
  );
};
