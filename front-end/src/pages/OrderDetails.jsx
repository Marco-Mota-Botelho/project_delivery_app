import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { requestData } from '../services/requests';
import Table from '../components/Table';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';

const { ORDER_ID, ORDER_DATE, DELIVERY_STATUS,
  DELIVERY_CHECK, TOTAL_PRICE, SELLER_NAME,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await requestData('sales/1');
        setOrder(data);
        setTotalPrice(data.totalPrice.replace('.', ','));
        const newDate = new Date(data.saleDate);
        setFormattedDate(newDate.toLocaleDateString('pt-BR'));
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
          <span data-testid={ ORDER_ID }>
            { order.id }
          </span>
          <p
            data-testid={ SELLER_NAME }
          >
            Fulana Pereira
          </p>
          <span data-testid={ ORDER_DATE }>
            { formattedDate }
          </span>
          <span data-testid={ `${DELIVERY_STATUS}-1` }>
            { order.status}
          </span>

          <button
            data-testid={ DELIVERY_CHECK }
            type="button"
            disabled={ order.status !== 'Entregue' }
          >
            MARCAR COMO ENTREGUE
          </button>

          <Table products={ order.products } />
          <span data-testid={ TOTAL_PRICE }>
            {totalPrice}
          </span>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
