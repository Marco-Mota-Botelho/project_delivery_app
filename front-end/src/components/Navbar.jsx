import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getUser, logOutUser } from '../services/userStorage';
import { LogoutIcon } from '../styles/Icons';
import { NavbarStyles, NameUser, BtnLogout } from '../styles/Navbar';
import SwitchTheme from './SwithTheme';

function NavBar({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAdm = pathname.includes('admin');
  const role = pathname.includes('customer') ? 'customer' : 'seller';

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logOutUser();
    navigate('/login');
  };

  return (
    <NavbarStyles>

      <NameUser isAdm data-testid="customer_products__element-navbar-user-full-name">
        { user.name }
      </NameUser>

      { isAdm && <span>Gerenciar Usuários</span> }

      { !isAdm && (
        <div>
          { role === 'customer' && (
            <NavLink
              data-testid="customer_products__element-navbar-link-products"
              to="/customer/products"
            >
              Produtos
            </NavLink>
          )}

          <NavLink
            data-testid="customer_products__element-navbar-link-orders"
            to={ `/${user.role}/orders` }
          >
            Pedidos
          </NavLink>
        </div>
      )}

      { children }

      <div>
        <SwitchTheme />

        <BtnLogout
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ handleLogout }
        >
          <LogoutIcon />
        </BtnLogout>
      </div>

    </NavbarStyles>
  );
}

NavBar.propTypes = {
  children: PropTypes.node,
};

NavBar.defaultProps = {
  children: null,
};

export default NavBar;
