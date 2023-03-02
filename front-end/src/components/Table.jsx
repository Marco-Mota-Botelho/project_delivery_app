import React from 'react';
import PropTypes from 'prop-types';
import TableStyle from '../styles/Table/TableStyles';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';

const {
  PRODUCT_INDEX, PRODUCT_NAME, PRODUCT_COUNT, PRODUCT_PRICE, PRODUCT_TOTAL,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

function Table({ products }) {
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
        { products && products.map((prod, i) => (
          <tr key={ prod.id }>
            <td data-testid={ `${PRODUCT_INDEX}-${i}` }>
              {i + 1}
            </td>
            <td data-testid={ `${PRODUCT_NAME}-${i}` }>
              {prod.name}
            </td>
            <td data-testid={ `${PRODUCT_COUNT}-${i}` }>
              {prod.count}
            </td>
            <td data-testid={ `${PRODUCT_PRICE}-${i}` }>
              {prod.price}

            </td>
            <td data-testid={ `${PRODUCT_TOTAL}-${i}` }>
              { `R$ ${(+prod.count * +prod.price).toFixed(2)}` }
            </td>
          </tr>
        ))}
      </tbody>
    </TableStyle>
  );
}
Table.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    totalPrice: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
};

export default Table;
