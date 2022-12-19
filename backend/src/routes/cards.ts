import { createOne } from "../controllers/cards/createOne";
import { deleteOne } from "../controllers/cards/deleteOne";
import { getAll } from "../controllers/cards/getAll";
import { getByCollection } from "../controllers/cards/getByCollection";
import { getOne } from "../controllers/cards/getOne";
import { updateMany } from "../controllers/cards/updateMany";
import { updateOne } from "../controllers/cards/updateOne";
import { cardRouteRestrictTo } from "../middlewares/cardRouteRestrictTo";
import { checkParamId } from "../middlewares/checkParamId";
import { protect } from "../middlewares/protect";

const express = require('express');
const router = express.Router();

router
  .route('/')
  .all(protect)
  .get(getAll)
  .post(createOne)

router
  .route('/byCollection')
  .all(protect, cardRouteRestrictTo('admin', 'requestPerformer'))
  .get(getByCollection)

router
  .route('/updateMultiple')
  .post(protect, updateMany)

router
  .route('/:id')
  .all(
    protect, 
    checkParamId('Card'),
    cardRouteRestrictTo('admin', 'requestPerformer')
  )
  .get(getOne)
  .patch(updateOne)
  .delete(deleteOne)


export default router;
