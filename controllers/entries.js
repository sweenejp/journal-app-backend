import { StatusCodes } from 'http-status-codes';
import Entry from '../models/Entry.js';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import User from '../models/User.js';

export const getAllEntries = async (req, res) => {
  const { userId } = req.user;
  const entries = await Entry.find({ createdBy: userId }).sort('-createdAt');
  res.status(StatusCodes.OK).json({ entries });
};

export const getAllPublicEntries = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  const entries = await Entry.find({ createdBy: userId, isPublic: true }).sort(
    '-createdAt'
  );
  res.status(StatusCodes.OK).json({ entries });
};

export const getPublicEntry = async (req, res) => {
  const { userId, entryId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  const entry = await Entry.findOne({
    createdBy: userId,
    isPublic: true,
    _id: entryId,
  });
  res.status(StatusCodes.OK).json({ entry });
};

export const createEntry = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const entry = await Entry.create(req.body);
  res.status(StatusCodes.CREATED).json({ entry });
};

export const getEntry = async (req, res) => {
  const { userId } = req.user;
  const { entryId } = req.params;
  const entry = await Entry.findOne({ _id: entryId, createdBy: userId });
  if (!entry) {
    throw new NotFoundError(`No entry with id ${entryId}`);
  }
  res.status(StatusCodes.OK).json({ entry });
};

export const deleteEntry = async (req, res) => {
  const { userId } = req.user;
  const { entryId } = req.params;
  const entry = await Entry.findOneAndDelete({
    _id: entryId,
    createdBy: userId,
  });
  if (!entry) {
    throw new NotFoundError(`No entry with id ${entryId}`);
  }
  res.status(StatusCodes.OK).send(`Deleted entry ${entryId}`);
};

export const deleteEntries = async (req, res) => {
  const { userId } = req.user;
  const entryIds = req.body;
  const deletedEntries = await Entry.deleteMany({
    _id: { $in: entryIds },
    createdBy: userId,
  });
  res.status(StatusCodes.OK).json({ deletedEntries });
};

export const updateEntry = async (req, res) => {
  const { userId } = req.user;
  const { entryId } = req.params;
  const { title } = req.body;
  if (!title) {
    throw new BadRequestError('You must provide a title');
  }
  const entry = await Entry.findOneAndUpdate(
    { _id: entryId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ entry });
};

export const getEntriesByTag = async (req, res) => {
  const { userId } = req.user;
  const { tag } = req.params;
  const entries = await Entry.find({ tags: tag, createdBy: userId });

  res.status(StatusCodes.OK).json({ entries });
};
