var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BoardSchema = new Schema({
  roomID: String,
  boardID:String,
 email: String 
});

var Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
