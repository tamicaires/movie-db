import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      {description && <p className="mb-6 text-gray-600">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};
