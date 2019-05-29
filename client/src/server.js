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
    })
});

app.use('/todos', todoRoutes);



app.post("/test", function(req, res) {
  db.create({ roomID: 'values' },{user: ["Diwal", "Diwal2"]} , {boardId: ""}, { email: 'Val' } )
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});





app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
