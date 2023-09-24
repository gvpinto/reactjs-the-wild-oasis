import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    // Query function Should be a Promise (async).
    // It could also be a direct fetch
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
