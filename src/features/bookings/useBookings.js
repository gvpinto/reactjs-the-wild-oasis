import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterField = 'status';
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: filterField, method: 'eq', value: filterValue };

  // SORT
  const sortRaw = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortRaw.split('-');
  const sortBy = { field, direction };
  //sortBy=name-asc

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    // Query function Should be a Promise (async).``
    // It could also be a direct fetch
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // if (isLoading) return { isLoading, bookings, error, count };

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      // Query function Should be a Promise (async).``
      // It could also be a direct fetch
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      // Query function Should be a Promise (async).``
      // It could also be a direct fetch
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
