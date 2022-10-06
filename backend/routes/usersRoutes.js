const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/users/signup');
const { login } = require('../controllers/users/login');
const { updateUser } = require('../controllers/users/updateUser');
const { deleteUser } = require('../controllers/users/deleteUser');
const { getUser } = require('../controllers/users/getUser');
const { getAllUsers } = require('../controllers/users/getAllUsers');
const { restrictTo } = require('../controllers/users/restrictTo');
const { protect } = require("../middlewares/protect");

router.post('/signup', signUp);
router.post('/login', login);

router
  .route('/')
  .all(protect)
  .get(getAllUsers)

router
  .route('/:id')
  .all(protect)
  .get(getUser)
  .patch(updateUser)
  .delete(restrictTo('admin'), deleteUser)

module.exports = router;