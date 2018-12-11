var mongoose = require("mongoose");
var rev = mongoose.model("Review");
var rev1 = mongoose.model("Review");
//var rev=mongoose.model('Review');
// var rev=require('../models/review');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.feedRead = function(req, res) {
    res.render("feedback", {
      title: "Feedback FoodSetGo!",
    });
  };

 module.exports.feedCreate = function(req, res) {
  rev.create(
    {
      uname: req.body.name,
      email: req.body.email,
      restName: req.body.restname,
      comments: req.body.comment,
      ratings:req.body.rating,
      userId:req.session.userId
      
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

module.exports.feedReadAll=function(req,res)
{
  rev.find()
    .exec(function(err, location) {
      console.log(location);
      //res.send(location);
      var response, review;
      if (!location) {
        sendJSONresponse(res, 404, {
          message: "reviews not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 400, err);
        return;
      }
      console.log("my session id"+req.session.userId)
      rev1.find({userId:req.session.userId}).exec(function(errrr,obj){
        if (!obj) {
          sendJSONresponse(res, 404, {
            message: "iner review not found"
          });
          return;
        } else if (errrr) {
          sendJSONresponse(res, 400, errrr);
          return;
        }
      res.render("viewreview",{title:'Reviews', reviews1:location,
    selfLog:obj});
      })
  });
};

module.exports.locationsUpdateOne = function(req, res) {

  if (!req.params.id) {
    sendJSONresponse(res, 404, {
      message: "Not found, locationid is required"
    });
    return;
  }
  rev.find({userId:req.params.id})
    .exec(function(err, location) {
      if (!location) {
        sendJSONresponse(res, 404, {
          message: "locationid not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 400, err);
        return;
      }
      location.comments = req.body.comments;
      //location.save();
       res.redirect("/rest");
    //   location.save(function(err, location) {
    //   if (err) {
    //     sendJSONresponse(res, 404, err);
    //   } else {
    //     sendJSONresponse(res, 200, location);
    //   }
    // }),function(error,loc)
    // {
    //   res.redirect('/rest');
    // }
     }); 
};

module.exports.locationsRead=function(req,res)
{
  if (!req.params.id) {
    sendJSONresponse(res, 404, {
      message: "Not found, locationid is required"
    });
    return;
  }
  rev.find({userId:req.params.id})
    .exec(function(err, location) {
      if (!location) {
        sendJSONresponse(res, 404, {
          message: "locationid not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 400, err);
        return;
      }
      
      res.render("editreview",{
        myID:location,
        myComment:location.comments
      });
    }); 
}

module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.restid && req.params.reviewid) {
    rev.findById(req.params.restid)
      //-.select("name reviews")
      .exec(function(err, location) {
        console.log(location);
        var response, review;
        if (!location) {
          sendJSONresponse(res, 404, {
            message: "restid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (location.reviews && location.reviews.length > 0) {
          review = location.reviews.id(req.params.reviewid);
          if (!review) {
            sendJSONresponse(res, 404, {
              message: "reviewid not found"
            });
          } else {
            response = {
              location: {
                name: location.name,
                id: req.params.restid
              },
              review: review
            };
            sendJSONresponse(res, 200, response);
          }
        } else {
          sendJSONresponse(res, 404, {
            message: "No reviews found"
          });
        }
      });
  } else {
    sendJSONresponse(res, 404, {
      message: "Not found, restid and reviewid are both required"
    });
  }
};


module.exports.locationsDeleteOne = function(req, res) {
  var locationid = req.params.id;
  if (locationid) {
    rev.findByIdAndRemove(locationid).exec(function(err, location) {
      if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log("Location id " + locationid + " deleted");
      res.redirect("/feedback/read")
     // sendJSONresponse(res, 204, null);
    });
  } else {
    sendJSONresponse(res, 404, {
      message: "No locationid"
    });
  }
};

