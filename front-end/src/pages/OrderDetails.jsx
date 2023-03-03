import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { requestData } from '../services/requests';
import OrderTable from '../components/OrderTable';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';

const { ORDER_ID, ORDER_DATE, DELIVERY_STATUS,
  DELIVERY_CHECK, TOTAL_PRICE, SELLER_NAME,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const { pathname } = useLocation();
  const { id } = useParams();

  const role = pathname.includes('customer') ? 'customer' : 'seller';

  useEffect(() => {
    console.log();
    const fetchOrders = async () => {
      try {
        const data = await requestData(`sales/saleId/${id}`);
        const newDate = new Date(data.saleDate).toLocaleDateString('pt-BR');
        setOrder(data);
        setTotalPrice(data.totalPrice.replace('.', ','));
        setFormattedDate(newDate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [id, pathname]);

  return (
    <div>
      <NavBar />
      { order && (
        <div key={ order.id }>

          <span data-testid={ `${role}${ORDER_ID}` }>
            { order.id }
          </span>
          <p data-testid={ `${role}${SELLER_NAME}` }>
            Fulana Pereira
          </p>
          <span data-testid={ `${role}${ORDER_DATE}` }>
            { formattedDate }
          </span>
          <span data-testid={ `${role}${DELIVERY_STATUS}-1` }>
            { order.status}
          </span>

          <button
            data-testid={ `${role}${DELIVERY_CHECK}` }
            type="button"
            disabled={ order.status !== 'Entregue' }
          >
            MARCAR COMO ENTREGUE
          </button>

          <OrderTable products={ order.products } />
          <span data-testid={ `${role}${TOTAL_PRICE}` }>
            {totalPrice}
          </span>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
