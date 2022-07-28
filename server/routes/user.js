const express = require("express");

const authController = require("./../controllers/auth");
const userController = require("./../controllers/users");

const router = express.Router();

router.use(authController.isLoggedIn);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

router.delete("/deleteMe", authController.protect, userController.deleteMe);

router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );

module.exports = router;
