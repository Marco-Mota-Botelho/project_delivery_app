import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import api, { requestData } from '../services/requests';
import OrderTable from '../components/OrderTable';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';

const statusSales = {
  pendente: 'pendente',
  emTransito: 'Em Trânsito',
  preparando: 'Preparando',
  entregue: 'Entregue',
};

const { ORDER_ID, ORDER_DATE, DELIVERY_STATUS, PREPARING_CHECK,
  DELIVERY_CHECK, TOTAL_PRICE, SELLER_NAME, DISPATCH_CHECK,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [statusSale, setStatusSale] = useState(null);
  const { pathname } = useLocation();
  const { id } = useParams();

  const role = pathname.includes('customer') ? 'customer' : 'seller';

  useEffect(() => {
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
  }, [id, role]);

  const updateStatusSale = async (SaleStatus) => {
    try {
      await api.put(`/sales/seller/updateStatus/${id}`, { SaleStatus });
      setStatusSale(SaleStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      { order && (
        <div key={ order.id }>

          <span data-testid={ `${role}${ORDER_ID}` }>
            { order.id }
          </span>
          <p data-testid={ `${role}${SELLER_NAME}` }>
            { order.seller.name }
          </p>
          <span data-testid={ `${role}${ORDER_DATE}` }>
            { formattedDate }
          </span>
          <span data-testid={ `${role}${DELIVERY_STATUS}-1` }>
            { statusSale || order.status }
          </span>

          { role === 'customer' ? (
            <button
              data-testid={ `${role}${DELIVERY_CHECK}` }
              type="button"
              disabled={
                !statusSale
                  ? order.status !== statusSales.emTransito
                  : statusSale !== statusSales.emTransito
              }
              onClick={ () => updateStatusSale('Entregue') }
            >
              MARCAR COMO ENTREGUE
            </button>
          ) : (
            <div>
              <button
                data-testid={ `${role}${PREPARING_CHECK}` }
                type="button"
                disabled={ order.status !== 'Pendente' }
                onClick={ () => updateStatusSale('Preparando') }
              >
                PREPARAR PEDIDO
              </button>
              <button
                data-testid={ `${role}${DISPATCH_CHECK}` }
                type="button"
                disabled={ order.status !== 'Preparando' }
                onClick={ () => updateStatusSale(statusSales.emTransito) }
              >
                SAIU PARA ENTREGA
              </button>
            </div>
          )}

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
