const router = require("express").Router();
const usersController = require("../../controllers/usersController.js");

router.route("/")
  .post(usersController.create);

module.exports = router;