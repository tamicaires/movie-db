export const LoadingSpinner = () => {
  return (
    <div
      className="flex items-center justify-center p-8"
      role="status"
      aria-live="polite"
      aria-label="Carregando conteúdo"
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary-600"
        aria-hidden="true"
      />
    </div>
  );
};
