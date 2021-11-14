import express from 'express';
const router = express.Router();

import { getAllEntries } from '../controllers/entries.js';

router.route('/').get(getAllEntries);

export default router;
