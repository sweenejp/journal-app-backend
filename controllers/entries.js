const Entry = require('../models/Entry.js');
const { createCustomError } = require('../errors/custom-api.js');

const getAllEntries = async (req, res) => {
  const entries = await Entry.find({});
  res.status(200).json({ entries });
};

const createEntry = async (req, res) => {
  const entry = await Entry.create(req.body);
  res.status(201).json({ entry });
};

const getEntry = async (req, res, next) => {
  const { entryID } = req.params;
  const entry = await Entry.findOne({ _id: entryID });
  if (!entry) {
    return next(createCustomError(`No entry with id ${entryID} exists`, 404));
  }
  res.status(200).json({ entry });
};

const deleteEntry = async (req, res, next) => {
  const { entryID } = req.params;
  const entry = await Entry.findOneAndDelete({ _id: entryID });
  if (!entry) {
    return next(createCustomError(`No entry with id ${entryID} exists`, 404));
  }
  res.status(200).json({ entry });
};

const updateEntry = async (req, res, next) => {
  const { entryID } = req.params;
  const entry = await Entry.findOneAndUpdate({ _id: entryID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!entry) {
    return next(createCustomError(`No entry with id ${entryID} exists`, 404));
  }
  res.status(200).json({ entry });
};

const getEntriesByTag = async (req, res, next) => {
  const { tag } = req.params;
  const entries = await Entry.find({ tags: tag }).exec();
  if (!entries) {
    return next(createCustomError(`No entires tagged with ${tag}`, 404));
  }
  res.status(200).json({ entries });
};

module.exports = {
  getAllEntries,
  createEntry,
  getEntry,
  deleteEntry,
  updateEntry,
  getEntriesByTag,
};
