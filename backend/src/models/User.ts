import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from "@internal/shared";
import UserPusherEvents from "../events/User";
import Card from "./Card";
import Collection from "./Collection";

const userSchema = new mongoose.Schema<IUser>({
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

userSchema.methods.isPasswordCorrect = async function(
  inputPassword: string, 
  currentUserPassword: string
) {
  return await bcrypt.compare(inputPassword, currentUserPassword);
}

userSchema.post("save", async function(newUser: IUser) {
  UserPusherEvents.user_added(newUser);
});

userSchema.post("findOneAndUpdate", async function(updatedUser: IUser) {
  UserPusherEvents.user_updated(updatedUser);
});

userSchema.post("remove", async function(deletedUser: IUser) {
  const cardsIds = await Card
    .find({ createdBy: deletedUser._id })
    .then((cards) => cards.map(card => card._id));

  const collectionsIds = await Collection
    .find({ createdBy: deletedUser._id })
    .then((collections) => collections.map(collection => collection._id));

  await Card.deleteMany({ createdBy: deletedUser._id });
  await Collection.deleteMany({ createdBy: deletedUser._id });

  UserPusherEvents.user_deleted(
    deletedUser,
    cardsIds,
    collectionsIds
  );
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

