const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CardCollection',
    default: null,
  },
}, {
  timestamps: true,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;