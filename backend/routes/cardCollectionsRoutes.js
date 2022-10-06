const express = require('express');
const router = express.Router();

const { protect } = require("../middlewares/protect");
const { createNewCollection } = require("../controllers/cardsCollections/createNewCollection");
const { getAllCollections } = require("../controllers/cardsCollections/getAllCollections");
const { getCollection } = require("../controllers/cardsCollections/getCollection");
const { updateCollection } = require("../controllers/cardsCollections/updateCollection");
const { deleteCollection } = require("../controllers/cardsCollections/deleteCollection");

router
  .route('/')
  .all(protect)
  .get(getAllCollections)
  .post(createNewCollection)

router
  .route('/:id')
  .all(protect)
  .get(getCollection)
  .patch(updateCollection)
  .delete(deleteCollection)

module.exports = router;