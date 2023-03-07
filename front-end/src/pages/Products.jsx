import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import Navbar from '../components/Navbar';
import { getProductsCard } from '../services/cartStorage';
import { requestData } from '../services/requests';
import { TEST_ID_PRODUCTS } from '../utils/dataTestsIds';
import { ContainerProducts, TotalPrice, ButtonCart, Container,
  SpanCountCartItems } from '../styles/Products';
import { ShoppingCartIcon } from '../styles/Icons';

const oneSecond = 2000;

function Products() {
  const [products, setProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countItems, setCountItems] = useState(0);
  const [isAnimation, setIsAnimation] = useState(false);
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

    setCountItems(getProductsCard().length);
    setIsAnimation(true);
    setTimeout(() => {
      setIsAnimation(false);
    }, oneSecond);
  }, [totalPrice]);

  const handleClick = () => {
    navigate('/customer/checkout');
  };

  return (
    <Container>

      <Navbar>

        <div>
          <TotalPrice
            data-testid={ TEST_ID_PRODUCTS.BOTTOM_VALUE }
            animations={ isAnimation.toString() }
          >
            { totalPrice }
          </TotalPrice>
          <ButtonCart
            type="button"
            data-testid={ TEST_ID_PRODUCTS.BUTTON_CART }
            onClick={ handleClick }
            disabled={ totalPrice === 0 }
          >
            <ShoppingCartIcon animations={ isAnimation.toString() } />
            <SpanCountCartItems>
              { countItems }
            </SpanCountCartItems>
          </ButtonCart>
        </div>

      </Navbar>

      <ContainerProducts>
        { products && products.map((product) => (
          <CardProduct
            product={ product }
            key={ product.id }
            sumTotalPrice={ sumTotalPrice }
          />
        ))}
      </ContainerProducts>
    </Container>
  );
}

export default Products;
