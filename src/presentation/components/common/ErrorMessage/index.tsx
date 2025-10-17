import { MdErrorOutline } from 'react-icons/md';
import { Button } from '../Button';
import { RippleWrapper } from '../RippleEffect';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  message = 'Algo deu errado. Tente novamente.',
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <RippleWrapper
        className="mb-4"
        rippleProps={{
          size: 'lg',
          color: 'red-600',
          intensity: 'medium',
          rings: 4,
        }}
      >
        <MdErrorOutline className="h-16 w-16 text-red-600" />
      </RippleWrapper>
      <p className="mb-4 text-lg text-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Tentar novamente
        </Button>
      )}
    </div>
  );
};
