const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'new_file',
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

FileSchema.virtual('type').get(() => 'file');

module.exports = mongoose.model('File', FileSchema);
