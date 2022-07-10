import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

export const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, settings: user.settings, id: userId } });
};

export const updateUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, settings: user.settings } });
};
