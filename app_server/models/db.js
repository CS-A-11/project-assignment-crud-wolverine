var mongoose = require("mongoose");
var gracefulShutdown;
 var dbURI = "mongodb://user:foodme1@ds237723.mlab.com:37723/mydb"; 
// var dbURI = "mongodb://localhost/foodsetgo";

if (process.env.NODE_ENV === "production") {
    dbURI = "mongodb://user:foodme1@ds237723.mlab.com:37723/mydb"; 
  // dbURI = "mongodb://localhost/foodsetgo";
}
mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
  
);
mongoose.connect(dbURI);

mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

mongoose.connection.once('open',function()
{
  console.log('connected to MongoDB');
});

mongoose.connection.on('error',function(err)
{
  console.log('error');
});
// For nodemon restarts
// process.once("SIGUSR2", function() {
//   gracefulShutdown("nodemon restart", function() {
//     process.kill(process.pid, "SIGUSR2");
//   });
// });
// // For app termination
// process.on("SIGINT", function() {
//   gracefulShutdown("app termination", function() {
//     process.exit(0);
//   });
// });
// // For Heroku app termination
// process.on("SIGTERM", function() {
//   gracefulShutdown("Heroku app shutdown", function() {
//     process.exit(0);
//   });
// });
require("./signup");
 require("./member");
 require("./orders");
// require("./discount");
// require("./management");
 require("./menu");
 require("./restaurant");
 require("./contact");
 require("./review");
 require("./login");
 
//  require("./feedback");