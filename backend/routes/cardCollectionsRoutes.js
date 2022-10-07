const express = require('express');
const router = express.Router();

const { protect } = require("../middlewares/protect");
const { collectionRouteRestrictTo } = require("../middlewares/collectionRouteRestrictTo");
const { createNewCollection } = require("../controllers/cardsCollections/createNewCollection");
const { getAllCollections } = require("../controllers/cardsCollections/getAllCollections");
const { getSingleCollection } = require("../controllers/cardsCollections/getSingleCollection");
const { updateCollection } = require("../controllers/cardsCollections/updateCollection");
const { deleteCollection } = require("../controllers/cardsCollections/deleteCollection");

router
  .route('/')
  .all(protect)
  .get(getAllCollections)
  .post(createNewCollection)

router
  .route('/:id')
  .all(protect, collectionRouteRestrictTo('admin', 'requestPerformer'))
  .get(getSingleCollection)
  .patch(updateCollection)
  .delete(deleteCollection)

module.exports = router;