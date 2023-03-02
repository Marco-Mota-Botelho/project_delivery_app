const SalesService = require('../services/SalesServices');

const create = async (req, res) => {
  const sale = req.body;
  const result = await SalesService.create(sale);
  if (result) return res.status(201).json(result);
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const userSales = await SalesService.getByUserId(id);
  if (userSales) return res.status(200).json(userSales);
};

module.exports = { create, getByUserId };
