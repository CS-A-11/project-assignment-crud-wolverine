
 var mongoose = require("mongoose");

  orderSchema = new mongoose.Schema({
      
  restName: { type: String, required: true },
  locName: { type: String, required: true },
  cuisineName: { type: String, required: true },
  time: { type: String ,required: true}
});

var orders = mongoose.model("orders", orderSchema);
module.exports = orders;