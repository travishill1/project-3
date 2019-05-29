var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BoardSchema = new Schema({
  roomID: {
    type: String
    
  },

  boardID: {
    type: String
    
  },

  user: {
    type: Array
  },
  

  email: {
    type: String,
   
  }

  
});

var Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
