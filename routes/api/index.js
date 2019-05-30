const router = require("express").Router();
const userRoutes = require("./users");

// User routes
router.use("/user", userRoutes);

module.exports = router;