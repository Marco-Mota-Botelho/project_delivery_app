import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TEST_ID_CUSTOMER_ORDER } from '../utils/dataTestsIds';
import { getUser } from '../services/userStorage';

const { ORDER_ID, DELIVERY_STATUS, ORDER_DATE, PRICE } = TEST_ID_CUSTOMER_ORDER;

function CardOrder({ sale }) {
  const [user, setRole] = useState({ role: 'customer' });

  const finalDate = new Date(sale.saleDate).toLocaleDateString('pt-BR');
  const finalPrice = `R$ ${sale.totalPrice.replace('.', ',')}`;

  useEffect(() => {
    setRole(getUser());
  }, []);

  return (
    <div>
      <Link to={ `/${user.role}/orders/${sale.id}` }>
        <section>
          <h1>
            Pedido:
            <span data-testid={ `${user.role}${ORDER_ID}${sale.id}` }>
              {sale.id}
            </span>
          </h1>
        </section>
        <section>
          <h1 data-testid={ `${user.role}${DELIVERY_STATUS}${sale.id}` }>
            {sale.status}
          </h1>
        </section>
        <section>
          <h1 data-testid={ `${user.role}${ORDER_DATE}${sale.id}` }>
            {finalDate}
          </h1>
        </section>
        <section>
          <h1 data-testid={ `${user.role}${PRICE}${sale.id}` }>
            {finalPrice}
          </h1>
        </section>
      </Link>
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
