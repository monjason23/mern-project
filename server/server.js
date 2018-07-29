var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

var port = process.env.PORT || 4500;

app.use(bodyParser.json());
app.use(cors());

app.get("/hello", function(req, res) {
  res.status(200).send({ connected: "Now connected" });
});

app.listen(port, function() {
  console.log("Server running at port " + port);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "./../client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./../client/build", "index.html"));
  });
}