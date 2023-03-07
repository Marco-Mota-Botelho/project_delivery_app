import { useState, useEffect } from 'react';

import CardOrder from '../components/CardOrder';
import NavBar from '../components/Navbar';
import { requestData } from '../services/requests';
import { BoxOrders, ContainerOrder } from '../styles/Orders';

function Orders() {
  const [sales, setSales] = useState(null);
  const fetchSales = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await requestData(`/sales/${user.role}/${user.id}`);
    setSales(response);
  };

  useEffect(() => {
    fetchSales();
  }, []);
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
