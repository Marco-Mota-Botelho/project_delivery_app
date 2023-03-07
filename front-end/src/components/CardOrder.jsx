import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TEST_ID_CUSTOMER_ORDER } from '../utils/dataTestsIds';
import { getUser } from '../services/userStorage';
import { CardOrderStyle, SaleIdStyle, StatusOrderStyle } from '../styles/Orders';

const { ORDER_ID, DELIVERY_STATUS, ORDER_DATE, PRICE } = TEST_ID_CUSTOMER_ORDER;

function CardOrder({ sale }) {
  const [user, setRole] = useState({ role: 'customer' });

  const finalDate = new Date(sale.saleDate).toLocaleDateString('pt-BR');
  const finalPrice = `R$ ${sale.totalPrice.replace('.', ',')}`;

  useEffect(() => {
    setRole(getUser());
  }, []);

  return (
    <Link to={ `/${user.role}/orders/${sale.id}` }>
      <CardOrderStyle>
        <SaleIdStyle data-testid={ `${user.role}${ORDER_ID}${sale.id}` }>
          {sale.id}
        </SaleIdStyle>
        <StatusOrderStyle
          data-testid={ `${user.role}${DELIVERY_STATUS}${sale.id}` }
          className={ sale.status === 'Em Trânsito' ? 'emTransito' : sale.status }
        >
          {sale.status}
        </StatusOrderStyle>
        <span data-testid={ `${user.role}${ORDER_DATE}${sale.id}` }>
          {finalDate}
        </span>
        <span data-testid={ `${user.role}${PRICE}${sale.id}` }>
          {finalPrice}
        </span>
      </CardOrderStyle>
    </Link>
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
