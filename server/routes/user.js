const express = require('express');

const authController = require('./../controllers/auth');
const userController = require('./../controllers/users');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.isLoggedIn);

router.route('/').get(
  authController.protect,
  // authController.restrictTo("admin"),
  userController.getAllUsers
);

router.route('/one').get(authController.protect, userController.getOneUser);

router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;
