const express = require('express');
const router = express.Router();

const { protect } = require("../middlewares/protect");
const { createNewCard } = require("../controllers/cards/createNewCard");
const { getAllCards } = require("../controllers/cards/getAllCards");
const { getCard } = require("../controllers/cards/getCard");
const { updateCard } = require("../controllers/cards/updateCard");
const { deleteCard } = require("../controllers/cards/deleteCard");

router
  .route('/')
  .all(protect)
  .get(getAllCards)
  .post(createNewCard)

router
  .route('/:id')
  .all(protect)
  .get(getCard)
  .patch(updateCard)
  .delete(deleteCard)

module.exports = router;