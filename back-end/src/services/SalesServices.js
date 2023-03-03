const { Sale, SaleProduct, Product } = require('../database/models');

const create = async (sale) => {
  const saleDate = new Date().toLocaleDateString('pt-BR');
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

const getByUserId = async (id) => {
  const sales = await Sale.findAll({ where: { userId: id } });
  return sales;
};

const getBySellerId = async (id) => {
  const sales = await Sale.findAll({ where: { sellerId: id } });
  return sales;
};

module.exports = { create, getByUserId, getSalesBySaleId, getBySellerId };
