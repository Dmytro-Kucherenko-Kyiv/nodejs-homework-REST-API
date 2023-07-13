const { Contact } = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const result = await Contact.find({}, 'name email phone');
  res.json(result);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};
const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
const updateById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: 'missing fields' });
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json(result);
};
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json(result);
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};