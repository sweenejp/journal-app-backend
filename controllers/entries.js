import Entry from '../models/Entry.js';

export const getAllEntries = async (req, res) => {
  const entries = await Entry.find({});
  res.status(200).json({ entries });
};

export const createEntry = async (req, res) => {
  const entry = await Entry.create(req.body);
  res.status(201).json({ entry });
};

export const getEntry = async (req, res, next) => {
  const { entryID } = req.params;
  const entry = await Entry.findOne({ _id: entryID });

  res.status(200).json({ entry });
};

export const deleteEntry = async (req, res, next) => {
  const { entryID } = req.params;
  const entry = await Entry.findOneAndDelete({ _id: entryID });

  res.status(200).json({ entry });
};

export const updateEntry = async (req, res, next) => {
  const { entryID } = req.params;
  const entry = await Entry.findOneAndUpdate({ _id: entryID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ entry });
};

export const getEntriesByTag = async (req, res, next) => {
  const { tag } = req.params;
  const entries = await Entry.find({ tags: tag }).exec();

  res.status(200).json({ entries });
};
