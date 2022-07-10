import { Router } from 'express';
const router = Router();

import { getAllPublicEntries, getPublicEntry } from '../controllers/entries.js';

router.route('/:userId').get(getAllPublicEntries);
router.route('/:userId/:entryId').get(getPublicEntry);

export default router;
