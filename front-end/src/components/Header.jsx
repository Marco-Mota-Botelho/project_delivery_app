import { useLocation } from 'react-router-dom';
import ContainerHeader from '../styles/Header';
import SwitchTheme from './SwithTheme';

function Header() {
  const { pathname } = useLocation();

  const isLoginPage = pathname.includes('login');

  return (
    <ContainerHeader isLoginPage={ isLoginPage }>
      <SwitchTheme />
    </ContainerHeader>
  );
}

export default Header;
