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
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Card'
  }],
}, {
  timestamps: true
});

const CardCollection = mongoose.model('CardCollection', collectionSchema);

module.exports = CardCollection;