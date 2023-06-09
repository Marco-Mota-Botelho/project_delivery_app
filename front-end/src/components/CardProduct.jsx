import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { addProduct, removeProduct, getProductsCard } from '../services/cartStorage';
import { BoxButtons, BtnDifference, BtnSum, CartProduct,
  PriceProduct, TitleProduct } from '../styles/Products';

function CardProduct({ product, sumTotalPrice }) {
  const { price, name, urlImage, id } = product;
  const [count, setCount] = useState(0);

  const handleCount = ({ target: { innerText } }) => {
    if (innerText === '+') {
      setCount((prev) => (+prev + 1));
      addProduct({ ...product, count: +count + 1 });
      sumTotalPrice();
    } else {
      removeProduct({ ...product, count: +count - 1 });
      setCount((prev) => (+prev - 1));
      sumTotalPrice();
    }
  };

  const onInputChange = ({ target: { value } }) => {
    if (+value === 0 || value === '') {
      removeProduct(product, 'remove');
      sumTotalPrice();
      setCount(value);
    } else {
      addProduct({ ...product, count: +value });
      console.log(value);
      sumTotalPrice();
      setCount(value);
    }
  };

  useEffect(() => {
    if (count < 0) setCount(0);
  }, [count]);

  useEffect(() => {
    const allProducts = getProductsCard();
    const checkProduct = allProducts?.find((prod) => prod.id === product.id); // null fix
    if (checkProduct) setCount(checkProduct.count);
  }, [product]);

  return (
    <CartProduct>
      <TitleProduct
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </TitleProduct>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <PriceProduct
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {price.replace('.', ',')}
      </PriceProduct>
      <BoxButtons>
        <BtnSum
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ handleCount }
          className="btn-plus"
        >
          +
        </BtnSum>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          value={ count }
          onChange={ onInputChange }
        />
        <BtnDifference
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ handleCount }
        >
          -
        </BtnDifference>
      </BoxButtons>
    </CartProduct>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.string,
    name: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
  sumTotalPrice: PropTypes.func.isRequired,
};

export default CardProduct;
