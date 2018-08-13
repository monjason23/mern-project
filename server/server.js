var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");

var LocalStrategy = require("passport-local").Strategy;

var mongoose = require("mongoose");
var { User } = require("./models/MP_User");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/MyApp",
  { useNewUrlParser: true }
);

var port = process.env.PORT || 4500;

//Production deployment
require("./config/production")(app);

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//Express session middleware
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 2628000000 }
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findByCredentials(username, password)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(null, false, { error: err });
      });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(null, false, { error: "Error" }));
});

app.get("/", function(req, res) {
  res.status(200).send({ connected: "You are now connected" });
});

app.post("/login", passport.authenticate("local"), function(req, res) {
  res.send(req.user);
});

app.get("/user", function(req, res) {
  res.send(req.user);
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res) {
  let pass1 = req.body.password;
  let pass2 = req.body.password2;

  if (pass1 === pass2) {
    var newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    newUser
      .save()
      .then(doc => {
        res.status(200).send(doc);
      })
      .catch(err => res.status(400).send(err));
  } else res.status(500).send({ error: "Password did not match!" });
});

app.listen(port, function() {
  console.log("Server running at port " + port);
});
