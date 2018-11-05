
var mongoose = require("mongoose");
var rev = mongoose.model("Review");
//var rev=mongoose.model('Review');
// var rev=require('../models/review');
module.exports.feedRead = function(req, res) {
    res.render("feedback", {
      title: "feedback FoodSetGo!",
    });
  };

module.exports.feedCreate = function(req, res) {
  rev.create(
    {
      uname: req.body.name,
      email: req.body.email,
      restName: req.body.restname,
      comments: req.body.comment,
      ratings:req.body.rating
      
    },
    function(err, review) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(review);        
        res.redirect("/");
      }
    }
  );
};

module.exports.feedReadrev=function(req,res)
{
  if(req.params && req.params.id)
  {
    rev
      .findById(req.params.id)
      .exec(function(err,review)
      {
        if(!review)

        {
          console.log("review id not found");
        }else if (err){
          console.log(err);
        }
        console.log("location found");
      });

  }else{
    console.log("no location id in request");
  }
};