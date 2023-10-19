import { useDarkMode } from '../context/DarkModeContext';
import ButtonIcon from '../ui/ButtonIcon';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {!isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
