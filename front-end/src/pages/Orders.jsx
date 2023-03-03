import { useState, useEffect } from 'react';

import CardOrder from '../components/CardOrder';
import NavBar from '../components/Navbar';
import { requestData } from '../services/requests';

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
    <div>
      <NavBar />
      { sales?.map((sale) => (<CardOrder
        sale={ sale }
        key={ sale.id }
      />))}
    </div>
  );
}

export default Orders;
