import React from 'react';
import PropTypes from 'prop-types';
import TableStyle from '../styles/Table/TableStyles';
import { TEST_ID_CUSTOMER_ORDER_DETAILS } from '../utils/dataTestsIds';

const {
  PRODUCT_INDEX, PRODUCT_NAME, PRODUCT_COUNT, PRODUCT_PRICE, PRODUCT_TOTAL,
} = TEST_ID_CUSTOMER_ORDER_DETAILS;

function Table({ products }) {
  console.log(products);
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
              <td data-testid={ `${PRODUCT_INDEX}-${i}` }>
                {i + 1}
              </td>
              <td data-testid={ `${PRODUCT_NAME}-${i}` }>
                { name }
              </td>
              <td data-testid={ `${PRODUCT_COUNT}-${i}` }>
                { quantity }
              </td>
              <td data-testid={ `${PRODUCT_PRICE}-${i}` }>
                { price.replace('.', ',') }
              </td>
              <td data-testid={ `${PRODUCT_TOTAL}-${i}` }>
                {`R$ ${(+quantity * +price).toFixed(2).replace('.', ',')}` }
              </td>
            </tr>
          ),
        )}
      </tbody>
    </TableStyle>
  );
}
Table.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
};

export default Table;
