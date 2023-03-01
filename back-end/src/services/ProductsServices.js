const { Product } = require('../database/models');
const HttpStatusCode = require('../utils/HttpStatusCode');

const getAllProducts = async () => {
  const result = await Product.findAll();

  if (!result) return { status: HttpStatusCode.NOT_FOUND, message: 'Not found' };

  return { status: HttpStatusCode.OK, result };
};

module.exports = { getAllProducts };