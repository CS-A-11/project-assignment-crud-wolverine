var mongoose = require("mongoose");
var rev2 = mongoose.model("orders");

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.orders = function(req, res) {
    res.render("orders", {
      title: "orders FoodSetGo!",
    });
  };
  
  module.exports.orderSchema = function(req, res) {
    rev2.create(
      {
        locName: req.body.locname,
      },
      function(err, orders) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(orders); 
          console.log("price was shown on the cart and order placed");
          res.redirect("/");
        }
      }
    );
  };