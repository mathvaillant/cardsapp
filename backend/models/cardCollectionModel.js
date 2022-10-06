const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Card'
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('CardCollection', collectionSchema);