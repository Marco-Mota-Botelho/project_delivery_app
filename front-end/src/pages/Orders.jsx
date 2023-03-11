import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardOrder from '../components/CardOrder';
import NavBar from '../components/Navbar';
import { requestData } from '../services/requests';
import { getUser } from '../services/userStorage';
import { BoxOrders, ContainerOrder } from '../styles/Orders';

const rolePermissions = ['customer', 'seller'];

function Orders() {
  const [sales, setSales] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const role = pathname.includes('customer') ? 'customer' : 'seller';

  useEffect(() => {
    const user = getUser();
    if (!rolePermissions.includes(user.role) || role !== user.role) {
      return navigate('/401');
    }

    const fetchSales = async () => {
      const response = await requestData(`/sales/${user.role}/${user.id}`);
      setSales(response);
    };
    fetchSales();
  }, [navigate, role]);

  return (
    <ContainerOrder>
      <NavBar />
      <BoxOrders>
        { sales?.map((sale) => (
          <CardOrder
            sale={ sale }
            key={ sale.id }
          />
        ))}
      </BoxOrders>
    </ContainerOrder>
  );
}

export default Orders;
