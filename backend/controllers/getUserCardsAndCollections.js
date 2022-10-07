const ObjectId = require('mongoose').Types.ObjectId;
const Card = require('../models/cardModel');
const CardCollection = require('../models/cardCollectionModel');
const User = require('../models/userModel');

exports.getUserCardsAndCollections = async (req, res, next) => {
  try {
    const cards = await Card.find({ createdBy: ObjectId(req.params.id) });   
    const collections = await CardCollection.find({ createdBy: ObjectId(req.params.id) }); 

    return res.status(200).json({
      status: 'success',
      data: {
        cards,
        collections
      } 
    });
  } catch (error) {
    next(error);
  }  
}