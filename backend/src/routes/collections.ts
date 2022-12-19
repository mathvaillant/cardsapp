import express from "express"
import { createOne } from "../controllers/collections/createOne"
import { deleteOne } from "../controllers/collections/deleteOne"
import { getAll } from "../controllers/collections/getAll"
import { getOne } from "../controllers/collections/getOne"
import { updateOne } from "../controllers/collections/updateOne"
import { checkParamId } from "../middlewares/checkParamId"
import { collectionRouteRestrictTo } from "../middlewares/collectionRouteRestrictTo"
import { protect } from "../middlewares/protect"

const router = express.Router()

router.route("/").all(protect).get(getAll).post(createOne)

router
  .route("/:id")
  .all(
    protect,
    checkParamId("Collection"),
    collectionRouteRestrictTo("admin", "requestPerformer")
  )
  .get(getOne)
  .patch(updateOne)
  .delete(deleteOne)

export default router
