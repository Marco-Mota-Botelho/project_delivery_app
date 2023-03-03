import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import Navbar from '../components/Navbar';
import { getProductsCard } from '../services/cartStorage';
import { requestData } from '../services/requests';
import { TEST_ID_PRODUCTS } from '../utils/dataTestsIds';

function Products() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const sumTotalPrice = () => {
    const allProducts = getProductsCard();
    if (allProducts?.length) {
      const value = allProducts.reduce((acc, curr) => (
        curr.totalPrice ? acc + +curr.totalPrice : acc + +curr.price
      ), 0);
      setTotalPrice((+value).toFixed(2).replace('.', ','));
    } else setTotalPrice(0);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await requestData('/products');
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    sumTotalPrice();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (+totalPrice < 0) setTotalPrice(0);
  }, [totalPrice]);

  const handleClick = () => {
    navigate('/customer/checkout');
  };

  return (
    <div>
      <Navbar />
      <section
        style={
          { display: 'flex', width: '100%', flexWrap: 'wrap', margin: '20px' }
        }
      >
        { products.length > 0 && products.map((product) => (
          <CardProduct
            product={ product }
            key={ product.id }
            sumTotalPrice={ sumTotalPrice }
          />
        ))}
      </section>
      <button
        type="button"
        data-testid={ TEST_ID_PRODUCTS.BUTTON_CART }
        onClick={ handleClick }
        disabled={ totalPrice === 0 }
      >
        Ver Carrinho
        <span
          data-testid={ TEST_ID_PRODUCTS.BOTTOM_VALUE }
          style={ { padding: '10px' } }
        >
          { totalPrice }
        </span>
      </button>
    </div>
  );
}

export default Products;
