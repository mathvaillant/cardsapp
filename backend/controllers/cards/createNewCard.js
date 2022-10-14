const AppError = require('../../utils/AppError');
const Card = require('../../models/cardModel');
const { getCardColors } = require("../../utils/getCardColors");

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
      colors: getCardColors(),
    });

    res.status(201).json({
      status: 'success',
      message: 'Card successfully added!',
      data: newCard
    })

  } catch (error) {
    next(error);
  }
};