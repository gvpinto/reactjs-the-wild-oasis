import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    // Query function Should be a Promise (async).
    // It could also be a direct fetch
    queryFn: getBookings,
  });

  return { isLoading, bookings, error };
}
