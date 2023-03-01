import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, logOutUser } from '../services/userStorage';

export default function NavBar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logOutUser();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            data-testid="customer_products__element-navbar-link-products"
            to="/produtos"
          >
            Produtos
          </NavLink>
        </li>
        <li>
          <NavLink
            data-testid="customer_products__element-navbar-link-orders"
            to="/pedidos"
          >
            Pedidos
          </NavLink>
        </li>
        <li data-testid="customer_products__element-navbar-user-full-name">
          { user.name }
        </li>
        <li>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}
