const db = require("../models");

// Defining methods for the usersController
module.exports = {
  create: function(req, res) {
    db.User.create(req.body)
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
  }
};