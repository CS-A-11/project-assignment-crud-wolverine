var mongoose=require("mongoose");
var User = mongoose.model("User");
var rev=mongoose.model("Review");

module.exports.login = function(req, res) {
    res.render("login", {
      title: "login FoodSetGo!",
    });
  };
  
module.exports.userLogin = function(req, res) {
    if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, function(error, user) {
        if (error || !user) {
          var err = new Error("Wrong email or password.");
          err.status = 401;
          //sendJSONresponse(res, 401, err);
          console.log(err);
        } else {
          //sendJSONresponse(res, 200, user);
          console.log(user);
          req.session.userId = user._id;
          req.session.userName = user.username;

          console.log("user session id assigned" + req.session.userId);
          res.redirect("/");
        }
      });
    } else {
      var err = new Error("All fields required.");
      err.status = 400;
      //sendJSONresponse(res, 400, err);
      console.log(err);
    }
  };

module.exports.logout = function(req, res) {
    if (req.session) {
      console.log("destroying session " + req.session.userId);
      // delete session object
      req.session.destroy();
      res.locals.user = undefined;
      res.redirect("/");
    }
  };