
 var mongoose = require("mongoose");

  orderSchema = new mongoose.Schema({
      
  locName: { type: String, required: true }

});

var orders = mongoose.model("orders", orderSchema);
module.exports = orders;