import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { requestLogin, setToken, requestData } from '../services/requests';
import { getProductsCard, removeCart, removeProduct } from '../services/cartStorage';
import { BoxFormCheckout, ContainerCheckout } from '../styles/Checkout';
import TableStyle from '../styles/Table/TableStyles';
import { getUser } from '../services/userStorage';

function Checkout() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({ address: '', addressNumber: '', seller: 0 });
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState(null);

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
    const user = getUser();
    if (user.role !== 'customer') return navigate('/401');
    setToken(user.token);
    setProducts(getProductsCard());
    sumTotalPrice();

    const fetchSeller = async () => {
      const response = await requestData('/user/seller');
      setSellers(response);
      setState((prev) => ({ ...prev, seller: response[0].id }));
    };

    fetchSeller();
  }, [navigate]);

  return (
    <ContainerCheckout>
      <Navbar />
      <TableStyle>
        <p>Finalizar Pedido</p>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>

          </tr>
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
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          { totalPrice }
        </span>
      </TableStyle>
      <BoxFormCheckout action="">
        <select
          data-testid="customer_checkout__select-seller"
          name="seller"
          onChange={ onInputChange }
          value={ state.seller }
        >

          { sellers && (
            sellers.map((seller) => (
              <option
                key={ `seller-id-${seller.id}` }
                value={ seller.id }
              >
                { seller.name }
              </option>
            ))
          )}
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
      </BoxFormCheckout>
    </ContainerCheckout>
  );
}

export default Checkout;
