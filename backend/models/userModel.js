const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User;

