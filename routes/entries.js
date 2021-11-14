import express from 'express';
const router = express.Router();

import {
  createEntry,
  deleteEntry,
  getAllEntries,
  getEntry,
  updateEntry,
} from '../controllers/entries.js';

router.route('/').get(getAllEntries).post(createEntry);
router.route('/:entryID').get(getEntry).delete(deleteEntry).patch(updateEntry);

export default router;
