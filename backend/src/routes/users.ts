import express from 'express';
import { deleteOne } from "../controllers/users/deleteOne";
import { getAll } from "../controllers/users/getAll";
import { getOne } from "../controllers/users/getOne";
import { updateOne } from "../controllers/users/updateOne";
import { checkParamId } from "../middlewares/checkParamId";
import { protect } from "../middlewares/protect";
import { userRouteRestrictTo } from "../middlewares/userRouteRestrictTo";

const router = express.Router();

router
  .route('/')
  .get(protect, userRouteRestrictTo('admin'), getAll)

router
  .route('/:id')
  .all(
    protect, 
    checkParamId('User'), 
    userRouteRestrictTo('admin', 'requestPerformer')
  )
  .get(getOne)
  .patch(updateOne)
  .delete(deleteOne)

export default router;
