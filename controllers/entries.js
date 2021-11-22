import Entry from '../models/Entry.js';
import { asyncWrapper } from '../middleware/async.js';
import { createCustomError } from '../errors/custom-error.js';

export const getAllEntries = asyncWrapper(async (req, res) => {
  const entries = await Entry.find({});
  res.status(200).json({ entries });
});

export const createEntry = asyncWrapper(async (req, res) => {
  const entry = await Entry.create(req.body);
  res.status(201).json({ entry });
});

export const getEntry = asyncWrapper(async (req, res, next) => {
  const { entryID } = req.params;
  const entry = await Entry.findOne({ _id: entryID });
  if (!entry) {
    return next(createCustomError(`No entry with id ${entryID} exists`, 404));
  }
  res.status(200).json({ entry });
});

export const deleteEntry = asyncWrapper(async (req, res, next) => {
  const { entryID } = req.params;
  const entry = await Entry.findOneAndDelete({ _id: entryID });
  if (!entry) {
    return next(createCustomError(`No entry with id ${entryID} exists`, 404));
  }
  res.status(200).json({ entry });
});

export const updateEntry = async (req, res, next) => {
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

export const getEntriesByTag = asyncWrapper(async (req, res, next) => {
  const { tag } = req.params;
  const entries = await Entry.find({ tags: tag }).exec();
  if (!entries) {
    return next(createCustomError(`No entires tagged with ${tag}`, 404));
  }
  res.status(200).json({ entries });
});
