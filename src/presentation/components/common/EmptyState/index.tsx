import type { ReactNode } from 'react';
import { RippleWrapper } from '../RippleEffect';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {icon && (
        <div aria-hidden="true">
          <RippleWrapper
            className="mb-4"
            rippleProps={{
              size: 'xl',
              color: 'primary',
              intensity: 'light',
              rings: 3,
            }}
          >
            <div className="text-text-secondary">{icon}</div>
          </RippleWrapper>
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      {description && <p className="mb-6 text-text-secondary">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};
