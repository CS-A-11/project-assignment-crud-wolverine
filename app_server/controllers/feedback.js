
var mongoose = require("mongoose");
var rev = mongoose.model("restaurant");
//var rev=mongoose.model('Review');
// var rev=require('../models/review');
module.exports.feedRead = function(req, res) {
    res.render("feedback", {
      title: "Feedback FoodSetGo!",
    });
  };

/* module.exports.feedCreate = function(req, res) {
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
 */

module.exports.reviewsCreate = function(req, res) {
  if (req.params.restid) {
    rev.findById(req.params.restid)
      .select("reviews")
      .exec(function(err, location) {
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          doAddReview(req, res, location);
        }
      });
  } else {
    sendJSONresponse(res, 404, {
      message: "Not found, locationid required"
    });
  }
};

var doAddReview = function(req, res, location) {
  if (!location) {
    sendJSONresponse(res, 404, "restid not found");
  } else {
    console.log("In add review " + req.body.userId);
    console.log(res.locals.user);
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      userId: req.body.userId
    });
    location.save(function(err, location) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        //-updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};

/* var updateAverageRating = function(locationid) {
  console.log("Update rating average for", locationid);
  Loc.findById(locationid)
    .select("reviews")
    .exec(function(err, location) {
      if (!err) {
        doSetAverageRating(location);
      }
    });
}; */

/* var doSetAverageRating = function(location) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (location.reviews && location.reviews.length > 0) {
    reviewCount = location.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;
    location.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
}; */

module.exports.reviewsUpdateOne = function(req, res) {
  if (!req.params.restid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      message: "Not found, restid and reviewid are both required"
    });
    return;
  }
  rev.findById(req.params.restid)
    .select("reviews")
    .exec(function(err, location) {
      var thisReview;
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
        thisReview = location.reviews.id(req.params.reviewid);
        if (!thisReview) {
          sendJSONresponse(res, 404, {
            message: "reviewid not found"
          });
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          location.save(function(err, location) {
            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              //-updateAverageRating(location._id);
              sendJSONresponse(res, 200, thisReview);
            }
          });
        }
      } else {
        sendJSONresponse(res, 404, {
          message: "No review to update"
        });
      }
    });
};

module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.restid && req.params.reviewid) {
    rev.findById(req.params.restid)
      .select("name reviews")
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

// app.delete('/api/locations/:locationid/reviews/:reviewid'
module.exports.reviewsDeleteOne = function(req, res) {
  if (!req.params.restid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      message: "Not found, restid and reviewid are both required"
    });
    return;
  }
  rev.findById(req.params.restid)
    .select("reviews")
    .exec(function(err, location) {
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
        if (!location.reviews.id(req.params.reviewid)) {
          sendJSONresponse(res, 404, {
            message: "reviewid not found"
          });
        } else {
          location.reviews.id(req.params.reviewid).remove();
          location.save(function(err) {
            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              //-updateAverageRating(location._id);
              sendJSONresponse(res, 204, null);
            }
          });
        }
      } else {
        sendJSONresponse(res, 404, {
          message: "No review to delete"
        });
      }
    });
};