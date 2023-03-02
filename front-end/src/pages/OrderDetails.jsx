import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { requestOrder } from '../services/requests';
import Table from '../components/Table';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';

const { ORDER_ID, ORDER_DATE, DELIVERY_STATUS,
  DELIVERY_CHECK, TOTAL_PRICE,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

function OrderDetails() {
  const [orders, setOrders] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await requestOrder('/', { id });
        setOrders(data);
        setTotalPrice(data.reduce((acc, curr) => acc + +curr.price * +curr.count, 0));
      } catch (error) {
        console.log(error);
      }
    };
    console.log(id);
    fetchOrders();
  }, [id]);

  return (
    <div>
      <NavBar />
      { orders && (
        orders.map((order, i) => (
          <div key={ order.id }>
            <span data-testid={ ORDER_ID }>
              38 PEDIDO 0003
            </span>
            <p
              data-testid=""
            >
              P.VEND: Fulana Pereira
            </p>
            <span data-testid={ ORDER_DATE }>
              07/04/2021
            </span>
            <span data-testid={ `${DELIVERY_STATUS}-${i}` }>
              ENTREGUE
            </span>
            <button data-testid={ DELIVERY_CHECK } type="button">
              MARCAR COMO ENTREGUE

            </button>
            <Table products={ orders.products } />
            <span data-testid={ TOTAL_PRICE }>
              {totalPrice}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderDetails;
