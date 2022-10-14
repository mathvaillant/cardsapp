const mongoose = require('mongoose');
const { getCardColors } = require("../utils/getCardColors");
const mapKeyValueEvent = require("../utils/mapKeyValueEvent");
const PusherInit = require("../pusher");

const PUSHER_CHANNEL = 'cards';

const cardSchema = new mongoose.Schema({
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

cardSchema.post('save', async function(newCard) {
  const User = require('./userModel');

  await User.findByIdAndUpdate(newCard.createdBy, 
    { $push: { cards: newCard._id } },
  );

  PusherInit.trigger(PUSHER_CHANNEL, 'child_added', {
    reason: 'card_added', 
    data_changed: {
      cards: mapKeyValueEvent([newCard._id], 'child_added'), 
      users: mapKeyValueEvent([newCard.createdBy], 'child_updated'), 
    }, 
  });
});

cardSchema.post("findOneAndUpdate", async function(updatedCard) {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_updated', {
    reason: 'card_updated', 
    data_changed: {
      cards: mapKeyValueEvent([updatedCard._id], 'child_updated'), 
    }, 
  });
});

cardSchema.post("remove", async function(deletedCard) {
  const User = require('./userModel');
  
  await User.findByIdAndUpdate(deletedCard.createdBy, {
    $pull: { cards: deletedCard._id }
  });

  PusherInit.trigger(PUSHER_CHANNEL, 'child_deleted', {  
    reason: 'card_deleted', 
    data_changed: {
      cards: mapKeyValueEvent([deletedCard._id], 'child_deleted'), 
      users: mapKeyValueEvent([deletedCard.createdBy], 'child_updated'), 
    },
  });
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;