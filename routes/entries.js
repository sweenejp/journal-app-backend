const express = require('express');
const router = express.Router();

const {
  createEntry,
  deleteEntry,
  getAllEntries,
  getEntriesByTag,
  getEntry,
  updateEntry,
} = require('../controllers/entries.js');

router.route('/').get(getAllEntries).post(createEntry);
router.route('/:entryID').get(getEntry).delete(deleteEntry).patch(updateEntry);
router.route('/tag/:tag').get(getEntriesByTag);

module.exports = router;
