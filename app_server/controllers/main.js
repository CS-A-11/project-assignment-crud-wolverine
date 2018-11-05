/* GET home page */
var mongoose = require("mongoose");
var cont = mongoose.model("contact");
var JSAlert = require("js-alert");
// var popup = require('popups');
module.exports.index = function(req, res) {
  res.render("index", { title: "FoodSetGo!" });
};

module.exports.contact2=function(req,res)
{
  cont.create(
    {
      contactName: req.body.name,
      contactSub: req.body.email,
      contactEmail: req.body.subject,
      contactMsg: req.body.message
    },
    function(err, main) {
      if (err) {
        console.log(err);
        return;
      } else {  
        console.log(main)
         
        
        // popupS.alert({
        //   content: ('Your query has been saved and will be checked')});
        //  res.redirect("index");
      } 
      JSAlert.alert("Your query has been saved and will be checked"); 
    }
  ); 
};