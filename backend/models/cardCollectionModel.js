const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const CardCollection = mongoose.model('CardCollection', collectionSchema);

module.exports = CardCollection;