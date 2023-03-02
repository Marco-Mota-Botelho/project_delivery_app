import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CardOrder({ sale }) {
  const navitage = useNavigate();
  const date = sale.saleDate.split('T');
  const formatingDate = date[0].split('-');
  const finalDate = `${formatingDate[2]}/${formatingDate[1]}/${formatingDate[0]}`;
  const finalPrice = `R$ ${sale.totalPrice.replace('.', ',')}`;
  // const handleClick = () => {
  //  navitage(`/customer/orders/${sale.id}`);
  // };
  return (
    <div>
      <section>
        <h1>
          Pedidos
          <span data-testid={ `customer_orders__element-order-id-${sale.id}` }>
            { sale.id }
          </span>
        </h1>
      </section>
      <section>
        <h1 data-testid={ `customer_orders__element-delivery-status-${sale.id}` }>
          {sale.status}
        </h1>
      </section>
      <section>
        <h1 data-testid={ `customer_orders__element-order-date-${sale.id}` }>
          {finalDate}
        </h1>
      </section>
      <section>
        <h1 data-testid={ `customer_orders__element-card-price-${sale.id}` }>
          {finalPrice}
        </h1>
      </section>
    </div>
  );
}

CardOrder.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    totalPrice: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default CardOrder;
