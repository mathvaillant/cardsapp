const express = require('express');
const router = express.Router();

const { protect } = require("../middlewares/protect");
const { cardRouteRestrictTo } = require("../middlewares/cardRouteRestrictTo");
const { createNewCard } = require("../controllers/cards/createNewCard");
const { getAllCards } = require("../controllers/cards/getAllCards");
const { getSingleCard } = require("../controllers/cards/getSingleCard");
const { updateCard } = require("../controllers/cards/updateCard");
const { updateMultipleCards } = require("../controllers/cards/updateMultipleCards");
const { deleteCard } = require("../controllers/cards/deleteCard");
const { getCardsByCollection } = require("../controllers/cards/getCardsByCollection");

router
  .route('/')
  .all(protect)
  .get(getAllCards)
  .post(createNewCard)

router
  .route('/byCollection')
  .all(protect, cardRouteRestrictTo('admin', 'requestPerformer'))
  .get(getCardsByCollection)

router
  .route('/updateMultiple')
  .post(protect, updateMultipleCards)

router
  .route('/:id')
  .all(protect, cardRouteRestrictTo('admin', 'requestPerformer'))
  .get(getSingleCard)
  .patch(updateCard)
  .delete(deleteCard)


module.exports = router;