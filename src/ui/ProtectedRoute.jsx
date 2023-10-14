import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { isLoadingUser, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoadingUser) navigate('/login');
    },
    [isAuthenticated, isLoadingUser, navigate],
  );

  // 1. While loading, show a spinner
  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 2. Loading the Authenticated user
  // 3. If there is no authenticated user, redirect to /login

  // 4. If these is a user render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
