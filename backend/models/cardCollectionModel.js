const mongoose = require('mongoose');
const PusherInit = require("../pusher");
const Card = require("./cardModel");
const User = require("./userModel");
const mapKeyValueEvent = require("../utils/mapKeyValueEvent");

const PUSHER_CHANNEL = 'collections';

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

collectionSchema.post("save", async function(newCollection) {
  await User.findByIdAndUpdate(newCollection.createdBy, 
    { $push: { collections: newCollection._id } },
    { upsert: true, new: true },
  )

  PusherInit.trigger(PUSHER_CHANNEL, 'child_added', {
    data_changed: {
      collections: mapKeyValueEvent([newCollection._id], 'child_added'), 
      users: mapKeyValueEvent([newCollection.createdBy], 'child_updated'), 
    }, 
  });
});

collectionSchema.post("findOneAndUpdate", async function(updatedCollection) {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_updated', {
    data_changed: {
      collections: mapKeyValueEvent([updatedCollection._id], 'child_updated'), 
    }, 
  });
});

collectionSchema.post("remove", async function(deletedCollection) {
  await User.findByIdAndUpdate(deletedCollection.createdBy, {
    $pull: { collections: deletedCollection._id }
  });

  const cardsIds = await Card.find({ collectionId: deletedCollection._id })
    .then((cards) => cards.map(card => card._id));

  await Card.updateMany({ collectionId: deletedCollection._id }, {
    $set: { collectionId: null },
  });

  PusherInit.trigger(PUSHER_CHANNEL, 'child_deleted', {  
    data_changed: {
      collections: mapKeyValueEvent([deletedCollection._id], 'child_deleted'), 
      users: mapKeyValueEvent([deletedCollection.createdBy], 'child_updated'), 
      cards: mapKeyValueEvent(cardsIds, 'child_updated'), 
    },
  });
});


const CardCollection = mongoose.model('CardCollection', collectionSchema);

module.exports = CardCollection;