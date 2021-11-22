import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `must provide title value`],
    trim: true,
  },
  body: { type: String, default: "There's nothing here :(" },
  tags: { type: Array, default: [] },
  dateCreated: { type: Date, default: new Date() },
  dateUpdated: { type: Date, default: new Date() },
});

export default mongoose.model('Entry', EntrySchema);
