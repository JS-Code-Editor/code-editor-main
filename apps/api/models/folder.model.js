const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'new_folder',
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
      },
    ],
    childrenFolders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
      },
    ],
    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
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
    },
  },
  { timestamps: true }
);

FolderSchema.virtual('type').get(() => 'folder');

module.exports = mongoose.model('Folder', FolderSchema);
