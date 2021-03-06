import { Router } from 'express';
const router = Router();

import {
  createEntry,
  deleteEntries,
  deleteEntry,
  getAllEntries,
  getEntriesByTag,
  getEntry,
  updateEntry,
} from '../controllers/entries.js';

router.route('/').get(getAllEntries).post(createEntry);
router.route('/deleteEntries').post(deleteEntries);
router.route('/:entryId').get(getEntry).delete(deleteEntry).patch(updateEntry);
router.route('/tag/:tag').get(getEntriesByTag);

export default router;
