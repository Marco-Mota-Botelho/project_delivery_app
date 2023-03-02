const { Sale, SaleProduct, Product } = require('../database/models');

const create = async (sale) => {
  const saleDate = new Date();
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products } = sale;
  const result = await Sale
  .create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });
  await Promise.all(products.map((product) => SaleProduct
  .create({ saleId: result.id, productId: product.id, quantity: product.count })));
  return result;
};

const getSalesBySaleId = async (saleId) => {
  const result = await Sale.findByPk(saleId, {
    include: { model: Product, as: 'products' },
  });
  if (!result) return { status: 404, message: 'No Found' };
  return { status: 200, result };
};

module.exports = { create, getSalesBySaleId };