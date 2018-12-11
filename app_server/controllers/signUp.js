var bcrpyt=require("bcryptjs");
var mongoose=require("mongoose");
var User = mongoose.model("User");

module.exports.signUp = function(req, res) {
    res.render("signUp", {
      title: "signUp FoodSetGo!",
    });
  };
  
module.exports.signUpCreate = function(req, res) {

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmpassword:req.body.confirmpassword,
      phone:req.body.phone,
    },
    function(err, user) {
      if (err) {
        //sendJSONresponse(res, 400, err);
        console.log(err);
        return;
      } else {
        req.session.userId = user._id;
        console.log(user);
        //sendJSONresponse(res, 200, { status: "success" });
        //req.flash('success','You are now registered and can log in');
        res.redirect("/login");
      }
    }
  );
};


