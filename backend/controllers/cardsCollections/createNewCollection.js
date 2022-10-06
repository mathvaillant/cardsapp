const AppError = require('../../utils/AppError');
const CardCollection = require('../../models/cardCollectionModel');

exports.createNewCollection = async (req, res, next) => {
  try {
    const { name } = req.body;

    if(!name) {
      throw new AppError('Please provide a name to the collection!', 400);
    }

    const newCollection = await CardCollection.create({
      name,
      createdBy: req.user.id,
    });

    res.status(201).json({
      status: 'success',
      data: { newCollection }
    })

  } catch (error) {
    next(error);
  }
};