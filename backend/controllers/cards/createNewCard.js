const AppError = require('../../utils/AppError');
const Card = require('../../models/cardModel');
const User = require('../../models/userModel');
const CardCollections = require('../../models/cardCollectionModel');

exports.createNewCard = async (req, res, next) => {
  try {
    const { name, value, description, collectionId } = req.body;

    if(!name || !value || !description) {
      throw new AppError('Please, provide name, value and a description for the card!', 400);
    }

    const userCardAlreadyExists = await Card.findOne({
      $and: [
        { name: name },
        { createdBy: req.user._id },
      ]
    });

    if(userCardAlreadyExists) {
      throw new AppError('A card with the same name already exists. Please, provide a unique name!', 400);
    }

    const newCard = await Card.create({
      name,
      value,
      description,
      collectionId,
      createdBy: req.user._id,
    });

    if(!newCard) {
      throw new AppError('An error occurred while creating the new card', 400);
    }

    await CardCollections.findByIdAndUpdate(collectionId,
      { $push: { cards: newCard._id } },
      { upsert: true, new: true}
    )

    await User.findByIdAndUpdate(req.user._id, 
      { $push: { cards: newCard._id } },
      { upsert: true, new: true },
    )

    return res.status(201).json({
      status: 'success',
      data: { newCard }
    })

  } catch (error) {
    next(error);
  }
};