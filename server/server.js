var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var path = require("path");

var port = process.env.PORT || 4500;

app.use(bodyParser.json());
app.use(cors());

app.get("/hello", function(req, res) {
  res.status(200).send({ connected: "Now connected" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, function() {
  console.log("Server running at port " + port);
});
