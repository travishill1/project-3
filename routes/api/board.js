const router = require("express").Router();

const boardController = require("../../controllers/boardController.js")



router.route("/users/:roomId")
.get(boardController.find)

router.route("/add/:roomID/:boardID")
.post(boardController.create)

module.exports = router;