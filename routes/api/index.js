const router = require("express").Router();
const userRoutes = require("./user");
const boardRoutes = require("./board")



// User routes
router.use("/user", userRoutes);
router.use("/board", boardRoutes);


module.exports = router;