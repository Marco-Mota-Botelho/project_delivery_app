const SalesService = require('../services/SalesServices');

const create = async (req, res) => {
  const sale = req.body;
  const result = await SalesService.create(sale);
  if (result) return res.status(201).json(result);
};

const getSalesBySaleId = async (req, res) => {
  const { id } = req.params;
  const { message, result, status } = await SalesService.getSalesBySaleId(id);
  if (message) return res.status(status).json(message);

  return res.status(status).json(result);
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const userSales = await SalesService.getByUserId(id);
  if (userSales) return res.status(200).json(userSales);
};

const getBySellerId = async (req, res) => {
  const { id } = req.params;
  const sellerSales = await SalesService.getBySellerId(id);
  if (sellerSales) return res.status(200).json(sellerSales);
};

const updateStatusSale = async (req, res) => {
  const { SaleStatus } = req.body;
  const { id } = req.params;
  const { message, status } = await SalesService.updateStatusSale(SaleStatus, id);
  if (message) return res.status(status).json({ message });

  return res.status(status).json();
};

module.exports = { create, getByUserId, getSalesBySaleId, getBySellerId, updateStatusSale };
