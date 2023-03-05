import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableStyle from '../styles/Table/TableStyles';
import Navbar from '../components/Navbar';
import { requestLogin, setToken } from '../services/requests';
import { getProductsCard, removeCart, removeProduct } from '../services/cartStorage';

function Checkout() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({ address: '', addressNumber: '', seller: 2 });
  const [totalPrice, setTotalPrice] = useState(0);

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const sumTotalPrice = () => {
    const allProducts = getProductsCard();
    if (allProducts?.length) {
      const value = allProducts.reduce((acc, curr) => (
        curr.totalPrice ? acc + +curr.totalPrice : acc + +curr.price
      ), 0);
      setTotalPrice((+value).toFixed(2).replace('.', ','));
    } else setTotalPrice(0);
  };

  const removeItem = (product) => {
    removeProduct(product, 'remove');
    setProducts(getProductsCard());
    sumTotalPrice();
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const sales = {
      userId: user.id,
      sellerId: state.seller,
      totalPrice: totalPrice.replace(',', '.'),
      deliveryAddress: state.address,
      deliveryNumber: state.addressNumber,
      status: 'Pendente',
      products,
    };
    setToken(user.token);
    const result = await requestLogin('/sales', sales);
    navigate(`/customer/orders/${result.id}`);
    removeCart();
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token);
    setProducts(getProductsCard());
    sumTotalPrice();
  }, []);

  return (
    <div>
      <Navbar />
      <h3>Checkout</h3>
      <TableStyle>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quant...</th>
            <th>Valor Un...</th>
            <th>Sub-total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={ product.id }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                { i + 1 }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                { product.name }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                { product.count }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                { product.price.replace('.', ',') }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                { product.totalPrice.replace('.', ',') }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-remove-${i}` }
              >
                <button
                  type="submit"
                  onClick={ () => removeItem(product) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyle>
      <span
        data-testid="customer_checkout__element-order-total-price"
        style={ { padding: '10px' } }
      >
        { totalPrice }
      </span>
      <form action="">
        <select
          data-testid="customer_checkout__select-seller"
          name="seller"
          onChange={ onInputChange }
          value={ state.seller }
        >
          <option value={ 1 }>Vendedor 1</option>
          <option value={ 2 }>Vendedor 2</option>
          <option value={ 3 }>Vendedor 3</option>
        </select>
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          name="address"
          placeholder="Endreço"
          onChange={ onInputChange }
          value={ state.address }
        />

        <input
          type="text"
          data-testid="customer_checkout__input-address-number"
          name="addressNumber"
          placeholder="número"
          onChange={ onInputChange }
          value={ state.addressNumber }
        />
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleClick }
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Checkout;
