const AppError = require('../../utils/AppError');
const CardCollection = require('../../models/cardCollectionModel');

exports.createNewCollection = async (req, res, next) => {
  try {
    const { name } = req.body;

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
      createdBy: req.user._id,
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Collection successfully added!',
      data: newCollection
    });

  } catch (error) {
    next(error);
  }
};