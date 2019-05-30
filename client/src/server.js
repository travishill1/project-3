const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require('cors');

const todoRoutes = express.Router();

//const db = require("./models/boardModel");
const db = require("./Trello/models/boardModel");

const PORT = 3001;

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/boardID";

mongoose.connect(MONGODB_URI);


app.get("/users", function(req, res) {
  // res.send("Hello World");
 
   db.find({}, function(req, response){
     res.send(response)
   })
});



app.get("/users/:roomId", function(req, res) {
   // res.send("Hello World");
   console.log(req.params);
    db.findOne({roomID: req.params.roomId}, function(req, response){
      res.send(response)
      console.log(response);
      console.log("responses")
    })
});

app.use('/todos', todoRoutes);



app.post("/add/:roomID/:boardID", function(req, res) {
  console.log(req.params.roomID);
  console.log(req.params.boardID);
  var newDoc= new db({roomID: req.params.roomID, boardID: req.params.boardID})
newDoc.save(function (err, book) {
    if (err) return console.error(err);
    console.log("Saved");
  });

  // db.insert({ roomID: req.params.roomID }, {boardID: req.params.boardID} )
  //   .then(function(response) {
  //     res.json(response);
  //   })
  //   .catch(function(err) {
  //     res.json(err);
  //   });
});





app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
