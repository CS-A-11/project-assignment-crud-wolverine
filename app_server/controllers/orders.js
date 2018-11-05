var mongoose = require("mongoose");
var rev2 = mongoose.model("orders");
module.exports.orders = function(req, res) {
    res.render("orders", {
      title: "orders FoodSetGo!",
    });
  };
  
  module.exports.orderSchema = function(req, res) {
    rev2.create(
      {
        restName: req.body.name,
        locName: req.body.locname,
        cuisineName: req.body.cusinename,
        time: req.body.time
      },
      function(err, orders) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(orders);        
          res.redirect("/");
        }
      }
    );
  };