var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

var port = process.env.PORT || 4500;

require("./config/config");

app.use(bodyParser.json());
app.use(cors());

app.get("/hello", function(req, res) {
  res.status(200).send({ connected: "Now connected" });
});

app.listen(port, function() {
  console.log("Server running at port " + port);
});
