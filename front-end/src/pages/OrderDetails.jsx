import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import api, { requestData } from '../services/requests';
import OrderTable from '../components/OrderTable';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';
import { ContainerOrder, StatusOrderStyle } from '../styles/Orders';
import { BoxDetailsOrder, TotalPriceDetails } from '../styles/OrderDetails';

const { ORDER_ID, ORDER_DATE, DELIVERY_STATUS, PREPARING_CHECK,
  DELIVERY_CHECK, TOTAL_PRICE, SELLER_NAME, DISPATCH_CHECK,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

const statusSales = {
  pendent: 'Pendente',
  preparing: 'Preparando',
  inTransit: 'Em Trânsito',
  delivered: 'Entregue',
};

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [statusSale, setStatusSale] = useState(statusSales.pendent);
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

  useEffect(() => {
    if (order && order.status !== statusSales.pendent) {
      setStatusSale(order.status);
    }
  }, [order]);

  return (
    <ContainerOrder>
      <NavBar />
      { order && (
        <BoxDetailsOrder key={ order.id }>

          <span data-testid={ `${role}${ORDER_ID}` }>
            { `Nº Pedido: ${order.id}` }
          </span>
          { role === 'customer' ? (
            <span data-testid={ `${role}${SELLER_NAME}` }>
              { `Vendedor: ${order.seller.name}` }
            </span>
          ) : (
            <span>
              { `Cliente: ${order.user.name}` }
            </span>
          )}
          <span data-testid={ `${role}${ORDER_DATE}` }>
            { formattedDate }
          </span>
          <StatusOrderStyle
            data-testid={ `${role}${DELIVERY_STATUS}-1` }
            className={ statusSale === statusSales.inTransit ? 'emTransito' : statusSale }
          >
            { statusSale }
          </StatusOrderStyle>

          { role === 'customer' ? (
            <button
              data-testid={ `${role}${DELIVERY_CHECK}` }
              type="button"
              disabled={ statusSale !== statusSales.inTransit }
              onClick={ () => updateStatusSale(statusSales.delivered) }
            >
              MARCAR COMO ENTREGUE
            </button>
          ) : (
            <div>
              <button
                data-testid={ `${role}${PREPARING_CHECK}` }
                type="button"
                disabled={ statusSale !== statusSales.pendent }
                onClick={ () => updateStatusSale(statusSales.preparing) }
              >
                PREPARAR PEDIDO
              </button>
              <button
                data-testid={ `${role}${DISPATCH_CHECK}` }
                type="button"
                disabled={ statusSale !== statusSales.preparing }
                onClick={ () => updateStatusSale(statusSales.inTransit) }
              >
                SAIU PARA ENTREGA
              </button>
            </div>
          )}
        </BoxDetailsOrder>
      )}
      { order && <OrderTable products={ order.products } />}
      <TotalPriceDetails data-testid={ `${role}${TOTAL_PRICE}` }>
        {totalPrice}
      </TotalPriceDetails>
    </ContainerOrder>
  );
}

export default OrderDetails;
