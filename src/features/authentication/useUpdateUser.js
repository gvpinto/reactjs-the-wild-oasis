import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // Alternate way
    // mutationFn: ({ password, fullName, avatar }) =>
    //   updateCurrentUser({ password, fullName, avatar }),
    mutationFn: updateCurrentUser,
    // TODO: had to assingn and empty object to user. Investigate it.
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], user);
      //   queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}
