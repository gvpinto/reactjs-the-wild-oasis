import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLogoutUser } = useLogout();

  return (
    <ButtonIcon
      disabled={isLogoutUser}
      onClick={logout}
    >
      {!isLogoutUser ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
