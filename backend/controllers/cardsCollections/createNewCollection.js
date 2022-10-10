const AppError = require('../../utils/AppError');
const User = require('../../models/userModel');
const CardCollection = require('../../models/cardCollectionModel');
const PusherInit = require('../../pusher');
const { CHANNEL_NAME } = require('./constants');

exports.createNewCollection = async (req, res, next) => {
  try {
    const { name, cards } = req.body;

    if(!name) {
      throw new AppError('Please provide a name to the collection!', 400);
    }

    const userCollectionAlreadyExists = await CardCollection.findOne({
      $and: [
        { name: name },
        { createdBy: req.user._id }
      ]
    });

    if(userCollectionAlreadyExists) {
      throw new AppError('A collection with the same name already exists. Please, provide a unique name!', 400);
    }

    const newCollection = await CardCollection.create({
      name,
      cards,
      createdBy: req.user.id,
    });

    if(!newCollection){
      throw new AppError('An error occurred while creating the new collection', 400);
    }

    await User.findByIdAndUpdate(req.user._id, 
      { $push: { collections: newCollection._id } },
      { upsert: true, new: true },
    )

    PusherInit.trigger(CHANNEL_NAME, 'child_added', {
      message: 'New Collection added',
      collectionId: newCollection._id,  
    });

    return res.status(201).json({
      status: 'success',
      message: 'Collection successfully added!',
      data: { newCollection }
    })

  } catch (error) {
    next(error);
  }
};