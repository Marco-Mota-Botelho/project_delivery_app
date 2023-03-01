const ProductsService = require('../services/ProductsServices');

const getAllProducts = async (_req, res) => {
  const { message, status, result } = await ProductsService.getAllProducts();
  if (message) return res.status(status).json({ message });
  return res.status(status).json(result);
};

module.exports = { getAllProducts };
