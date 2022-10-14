const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const PusherInit = require("../pusher");
const mapKeyValueEvent = require("../utils/mapKeyValueEvent");
const Card = require("./cardModel");
const CardCollection = require("./cardCollectionModel");

const PUSHER_CHANNEL = 'users';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please tell your name']
  },
  username: {
    type: String,
    require: [true, 'Please tell your username'],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    require: [true, 'Please provide a password'],
    select: false,
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }],
  collections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  }]
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
})

userSchema.methods.isPasswordCorrect = async function(inputPassword, currentUserPassword) {
  return await bcrypt.compare(inputPassword, currentUserPassword);
}

userSchema.post("save", async function(newUser) {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_added', {
    data_changed: {
      users: mapKeyValueEvent([newUser._id], 'child_added'), 
    }, 
  });
});

userSchema.post("findOneAndUpdate", async function(updatedUser) {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_updated', {
    data_changed: {
      users: mapKeyValueEvent([updatedUser._id], 'child_updated'), 
    }, 
  });
});

userSchema.post("remove", async function(deletedUser) {
  const cardsIds = await Card
    .find({ createdBy: deletedUser._id })
    .then((cards) => cards.map(card => card._id));

  const collectionsIds = await CardCollection
    .find({ createdBy: deletedUser._id })
    .then((collections) => collections.map(collection => collection._id));

  await Card.deleteMany({ createdBy: deletedUser._id });

  await CardCollection.deleteMany({ createdBy: deletedUser._id });

  PusherInit.trigger(PUSHER_CHANNEL, 'child_deleted', {  
    data_changed: {
      users: mapKeyValueEvent([deletedUser._id], 'child_deleted'), 
      cards: mapKeyValueEvent(cardsIds, 'child_deleted'), 
      collections: mapKeyValueEvent(collectionsIds, 'child_deleted'), 
    },
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;

