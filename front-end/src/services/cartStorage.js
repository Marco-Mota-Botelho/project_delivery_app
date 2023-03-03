const PRODUCT_KEY = 'cart';

if (!JSON.parse(localStorage.getItem(PRODUCT_KEY))) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify([]));
}

export const removeCart = () => {
  localStorage.removeItem(PRODUCT_KEY);
  localStorage.setItem(PRODUCT_KEY, JSON.stringify([]));
};

const readProductCard = () => JSON.parse(localStorage.getItem(PRODUCT_KEY));

const saveProductCard = (product) => localStorage
  .setItem(PRODUCT_KEY, JSON.stringify(product));

export const getProductsCard = () => readProductCard();

export const addProduct = (product) => {
  const newProduct = {
    ...product,
    totalPrice: (+product.price * product.count).toFixed(2),
  };

  if (product) {
    const favoriteProducts = readProductCard();
    saveProductCard(
      [...favoriteProducts, newProduct],
    );
    const repeatsProducts = favoriteProducts.filter((e) => e.id === product.id);
    if (repeatsProducts.length > 0) {
      const noRepeats = favoriteProducts.filter((myProd) => myProd.id !== product.id);
      saveProductCard([...noRepeats, newProduct]);
    } else {
      saveProductCard([...favoriteProducts, newProduct]);
    }
  }
};

export const removeProduct = (product, secondParam = 'quantity') => {
  const favoriteProducts = readProductCard();
  const productDecrease = favoriteProducts.filter((e) => e.id === product.id);
  if (!productDecrease.length) return;
  if (secondParam === 'remove') {
    saveProductCard(favoriteProducts
      .filter((myProduct) => myProduct.id !== product.id));
  } else {
    const noRepeats = favoriteProducts.filter((myProd) => myProd.id !== product.id);
    const newProduct = {
      ...product,
      totalPrice: (+product.price * product.count).toFixed(2),
    };
    if (newProduct.count === 0) {
      saveProductCard(favoriteProducts
        .filter((myProduct) => myProduct.id !== product.id));
    } else saveProductCard([...noRepeats, newProduct]);
  }
};
