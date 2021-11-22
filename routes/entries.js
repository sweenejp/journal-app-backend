import express from 'express';
const router = express.Router();

import {
  createEntry,
  deleteEntry,
  getAllEntries,
  getEntriesByTag,
  getEntry,
  updateEntry,
} from '../controllers/entries.js';

router.route('/').get(getAllEntries).post(createEntry);
router.route('/:entryID').get(getEntry).delete(deleteEntry).patch(updateEntry);
router.route('/tag/:tag').get(getEntriesByTag);

export default router;
