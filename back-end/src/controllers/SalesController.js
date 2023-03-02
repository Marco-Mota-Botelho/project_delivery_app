const SalesService = require('../services/SalesServices');

const create = async (req, res) => {
  const sale = req.body;
  const result = await SalesService.create(sale);
  if (result) return res.status(201).json(result);
};

module.exports = { create };
