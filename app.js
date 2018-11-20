var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser=require('body-parser');
//var mongoose = require ("mongoose");
 var model=require("./app_server/models/db");
var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");
var db = model.connection;
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "pug");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



// parse application/json
app.use(bodyParser.json())

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    // store: new MongoStore({
    //   mongooseConnection: db
    // })
  })
);
app.use("/", function(req, res, next) {
  if (req.session.userId) {
    res.locals.user = req.session.userId;
    res.locals.userName = req.session.userName;
  }
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
