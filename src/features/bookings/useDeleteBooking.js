import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBooking,
    isLoading: isDeletingBooking,
    error,
  } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success('Booking successfully deleted');
      queryClient.invalidateQueries({
        // active: true,
        queryKey: 'bookings',
      });
    },
    onError: (data) => {
      toast.error(`Error while deleting booking# ${data.bookingId}`);
    },
  });

  return { deleteBooking, isDeletingBooking, error };
}
