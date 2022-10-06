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
    ref: 'CardCollection'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Card', cardSchema);