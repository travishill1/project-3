const db = require("../models");

// Defining methods for the usersController
module.exports = {
  create: function(req, res) {
    db.Board.create({roomID: req.params.roomID, boardID: req.params.boardID})
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
  },

  find:function(req, res){
    db.Board.findOne({roomID: req.params.roomId}, function(req, response){
        res.send(response)
        console.log(response);
        console.log("responses")
      })
  }

};