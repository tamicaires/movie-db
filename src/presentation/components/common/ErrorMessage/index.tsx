import { MdError } from 'react-icons/md';
import { Button } from '../Button';

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
      <MdError className="mb-4 h-16 w-16 text-accent-red" />
      <p className="mb-4 text-lg text-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Tentar novamente
        </Button>
      )}
    </div>
  );
};
