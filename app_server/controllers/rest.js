var mongoose = require("mongoose");
var rest = mongoose.model("restaurant");
/* GET list of locations */

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

 module.exports.home=function(req,res)
{
    //var rest1 = rest.find();
    //res.json(rest1);
    res.render("restlist",{
      rests:[
        {
          _id:"5bf16434fc21db00cce170e8",
          name: "PizzaHut",
          address: "Milad Street",
          rating: 2,
          facilities: ["Hot drinks", "Food", "Premium wifi"],
          image: "/images/pizzahut.jpeg"
        },
        {
          _id:"5bf16434fc21db00cce170e9",
          name: "Subway",
          address: "Food Street",
          rating: 2,
          facilities: ["Hot drinks", "Food", "Premium wifi"],
          image: "/images/subway.jpeg"
        }
      ]
    });
} 
module.exports.restListByDistance = function(req, res) {
    res.render("restlist");
    rest.find().exec(function(err, locations) {
      if (locations.length == 0) {
        // sendJSONresponse(res, 404, {
        //   message: "locations not found"
        // });
        // return;
        rest.create(
          [
            {
              name: "Pizza HuT",
              address: "Milad Street",
              rating: 2,
              facilities: ["Hot drinks", "Food", "Premium wifi"]
            },
            {
              name: "Subway",
              address: "Food Street",
              rating: 2,
              facilities: ["Hot drinks", "Food", "Premium wifi"]
            }
          ],
          function(error, locs) {
            if (error) {
              sendJSONresponse(res, 400, err);
            } else {
              locations = locs;
              sendJSONresponse(res, 200, locations);
            }
          }
        );
      } else if (locations) sendJSONresponse(res, 200, locations);
      else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
    });
  };

/* GET a location by the id */
module.exports.restReadOne = function(req, res) {
    console.log("Finding rest details", req.params);
    if (req.params && req.params.restid) {
      rest.findById(req.params.restid).exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            message: "restid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(location);
        sendJSONresponse(res, 200, location);
      });
    } else {
      console.log("No restid specified");
      sendJSONresponse(res, 404, {
        message: "No restid in request"
      });
    }
  };

  // module.exports.restInfo=function(req,res)
  // {
  //   res.render("restinfo",{
  //     rests:[
  //       {
  //         name: "PizzaHut",
  //         address: "Milad Street",
  //         rating: 2,
  //         facilities: ["Hot drinks", "Food", "Premium wifi"],
  //         image: "/images/pizzahut.jpeg"
  //       },
  //       {
  //         name: "Subway",
  //         address: "Food Street",
  //         rating: 2,
  //         facilities: ["Hot drinks", "Food", "Premium wifi"],
  //         image: "/images/subway.jpeg"
  //       }
  //     ]
  //   });

  // };

  module.exports.restInfo = function(req, res) {
    console.log("Finding location details", req.params);
    if (req.params && req.params.restid) {
      rest.findById(req.params.restid).exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            message: "locationid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        //console.log(location);
        //sendJSONresponse(res, 200, location);
        res.render("restinfo",{
          rests:[
            {
              name: location.name,
              address: location.address,
              rating: location.rating,
              facilities: location.facilities
           //   image: "/images/pizzahut.jpeg"
            }
          ]
        });
      });
    } else {
      console.log("No locationid specified");
      sendJSONresponse(res, 404, {
        message: "No locationid in request"
      });
    }
  };

  module.exports.searchAJAX = function(req, res) {
    // input value from search
    var val = req.query.search;
    console.log(val);
    rest.find({ name: val }).exec(function(err, books) {
      if (!books) {
        return;
      } else if (err) {
        console.log(err);
        return;
      }
      console.log(books);
      res.send(books);
    });
  };