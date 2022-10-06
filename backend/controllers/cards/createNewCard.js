const AppError = require('../../utils/AppError');
const Card = require('../../models/cardModel');

exports.createNewCard = async (req, res, next) => {
  try {
    const { name, value, description } = req.body;

    if(!name || !value || !description) {
      throw new AppError('Missing card data!', 400);
    }

    const newCard = await Card.create({
      name,
      value,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({
      status: 'success',
      data: { newCard }
    })

  } catch (error) {
    next(error);
  }
};