import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `must provide title value`],
      trim: true,
    },
    body: { type: String, default: "There's nothing here :(" },
    tags: { type: Array },
    featuredImage: { type: String },
    inTrash: { type: Boolean },
    // tie job to the user that created the entry
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing a user associated with this entry'],
    },
  },
  { timestamps: true }
);

const Entry = mongoose.model('Entry', EntrySchema);
export default Entry;
