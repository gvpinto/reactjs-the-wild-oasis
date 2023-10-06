import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterField = 'status';
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: filterField, method: 'eq', value: filterValue };

  //SORT
  const sortRaw = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortRaw.split('-');
  const sortBy = { field, direction };
  //sortBy=name-asc
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    // Query function Should be a Promise (async).``
    // It could also be a direct fetch
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, bookings, error };
}
