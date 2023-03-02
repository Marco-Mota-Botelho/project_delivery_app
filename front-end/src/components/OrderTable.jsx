import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import TableStyle from '../styles/Table/TableStyles';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';

const {
  PRODUCT_INDEX, PRODUCT_NAME, PRODUCT_COUNT, PRODUCT_PRICE, PRODUCT_TOTAL,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

function OrderTable({ products }) {
  const { pathname } = useLocation();

  const role = pathname.includes('customer') ? 'customer' : 'seller';

  return (
    <TableStyle>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        { products && products.map(
          ({ id, name, price, SaleProduct: { quantity } }, i) => (
            <tr key={ id }>
              <td data-testid={ `${role}${PRODUCT_INDEX}-${i}` }>
                {i + 1}
              </td>
              <td data-testid={ `${role}${PRODUCT_NAME}-${i}` }>
                { name }
              </td>
              <td data-testid={ `${role}${PRODUCT_COUNT}-${i}` }>
                { quantity }
              </td>
              <td data-testid={ `${role}${PRODUCT_PRICE}-${i}` }>
                { price.replace('.', ',') }
              </td>
              <td data-testid={ `${role}${PRODUCT_TOTAL}-${i}` }>
                {`R$ ${(+quantity * +price).toFixed(2).replace('.', ',')}` }
              </td>
            </tr>
          ),
        )}
      </tbody>
    </TableStyle>
  );
}
OrderTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
};

export default OrderTable;
