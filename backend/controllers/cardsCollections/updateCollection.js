const CardCollection = require('../../models/cardCollectionModel');

exports.updateCollection = async (req, res, next) => {
  try {
    const { name } = req.body;

    const collection = await CardCollection.findOneAndUpdate({ _id: req.params.id }, { name } , { 
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Collection updated successfully!',
      data: collection
    })
  } catch (error) {
    next(error);
  }
};