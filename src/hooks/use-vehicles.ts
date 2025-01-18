import React from 'react';
import { fetchVehicles } from '../utils/fetchVehicles';
import { Vehicle } from 'types';

export const useVehicles = (languageCode = 'ru') => {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true)
        const data = await fetchVehicles(languageCode);
        setVehicles(data);
      } catch (err) {
        setError(`Ошибка: ${String(err)}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, [languageCode]);

  return { vehicles, isLoading, error };
};
