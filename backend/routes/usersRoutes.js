const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/users/signup');
const { login } = require('../controllers/users/login');
const { updateUser } = require('../controllers/users/updateUser');
const { deleteUser } = require('../controllers/users/deleteUser');
const { getUser } = require('../controllers/users/getUser');
const { getAllUsers } = require('../controllers/users/getAllUsers');
const { protect } = require("../middlewares/protect");
const { userRouteRestrictTo } = require("../middlewares/userRouteRestrictTo");

router.post('/signup', signUp);
router.post('/login', login);

router
  .route('/')
  .get(protect, userRouteRestrictTo('admin'), getAllUsers)

router
  .route('/:id')
  .all(protect, userRouteRestrictTo('admin', 'requestPerformer'))
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router;