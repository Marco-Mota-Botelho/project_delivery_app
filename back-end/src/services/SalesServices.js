const { Sale, SaleProduct } = require('../database/models');

const create = async (sale) => {
  const saleDate = Date.now();
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products } = sale;
  const result = await Sale
  .create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });
  await Promise.all(products.map((product) => SaleProduct
  .create({ saleId: result.id, productId: product.id, quantity: product.count })));
  return result;
};

const getByUserId = async (id) => {
  const sales = await Sale.findAll({ where: { userId: id } });

  return sales;
};

module.exports = { create, getByUserId };