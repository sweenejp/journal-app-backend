const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `must provide title value`],
    trim: true,
  },
  body: { type: String, default: "There's nothing here :(" },
  tags: { type: Array },
  dateCreated: { type: Date },
  dateUpdated: { type: Date },
  featuredImage: { type: String },
});

module.exports = mongoose.model('Entry', EntrySchema);
