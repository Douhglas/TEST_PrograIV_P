import { useState } from 'react';

export const useError = () => {
  const [error, setError] = useState<string | null>(null);

  const setErrorMessage = (message: string) => {
    setError(message);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    setErrorMessage,
    clearError,
  };
};