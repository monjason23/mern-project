var path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}
