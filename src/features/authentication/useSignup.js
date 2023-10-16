import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const {
    mutate: signup,
    isLoading: isLoadingSignup,
    error,
  } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        'Account sucessfully created. Please verify the account using the user email address.',
      );
    },
  });

  return { signup, isLoadingSignup, error };
}
