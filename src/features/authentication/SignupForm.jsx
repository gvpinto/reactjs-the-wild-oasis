import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoadingSignup } = useSignup();

  function onSubmit({ email, password, fullName }) {
    signup(
      { email, password, fullName },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Full name'
        error={errors?.fullName?.message}
      >
        <Input
          type='text'
          id='fullName'
          {...register('fullName', {
            required: 'This field is required',
          })}
          disabled={isLoadingSignup}
        />
      </FormRow>

      <FormRow
        label='Email address'
        error={errors?.email?.message}
      >
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
          disabled={isLoadingSignup}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum length of 8 characters',
            },
          })}
          disabled={isLoadingSignup}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Password need to match',
          })}
          disabled={isLoadingSignup}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isLoadingSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
