import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { requestData } from '../services/requests';
import OrderTable from '../components/OrderTable';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';
import { getUser } from '../services/userStorage';

const { ORDER_ID, ORDER_DATE, DELIVERY_STATUS,
  DELIVERY_CHECK, TOTAL_PRICE, SELLER_NAME,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [user, setRole] = useState({ role: 'customer' });
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await requestData(`sales/saleId/${id}`);
        setOrder(data);
        setTotalPrice(data.totalPrice.replace('.', ','));
        const newDate = new Date(data.saleDate);
        setFormattedDate(newDate.toLocaleDateString('pt-BR'));
        setRole(getUser());
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [id]);

  return (
    <div>
      <NavBar />
      { order && (
        <div key={ order.id }>
          <span data-testid={ `${user.role}${ORDER_ID}` }>
            { order.id }
          </span>
          <p
            data-testid={ `${user.role}${SELLER_NAME}` }
          >
            Fulana Pereira
          </p>
          <span data-testid={ `${user.role}${ORDER_DATE}` }>
            { formattedDate }
          </span>
          <span data-testid={ `${user.role}${DELIVERY_STATUS}-1` }>
            { order.status}
          </span>

          <button
            data-testid={ `${user.role}${DELIVERY_CHECK}` }
            type="button"
            disabled={ order.status !== 'Entregue' }
          >
            MARCAR COMO ENTREGUE
          </button>

          <OrderTable products={ order.products } />
          <span data-testid={ `${user.role}${TOTAL_PRICE}` }>
            {totalPrice}
          </span>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
