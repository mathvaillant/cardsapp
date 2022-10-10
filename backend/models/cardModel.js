const mongoose = require('mongoose');
const { getCardColors } = require("../utils/getCardColors");

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
  colors: {
    type: [String],
    default: getCardColors(),
  }
}, {
  timestamps: true,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;