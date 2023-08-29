const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      default: 'dark',
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workspace', WorkSpaceSchema);
