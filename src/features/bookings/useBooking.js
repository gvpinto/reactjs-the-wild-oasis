import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    // Query function Should be a Promise (async).
    // It could also be a direct fetch
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, booking, error };
}
