
var mongoose=require('mongoose');

var signupSchema = new mongoose.Schema({
  // signupID ={type:Number,required:true},
   signupName:{type:String,required:true},
   signupEmail:{type:String,required:true},
   signupPassword:{type:String,required:true},
  // signupCPassword:{type:String,required:true}
   signupPhone:{type:Number}
    
});

module.exports=mongoose.model("signup",signupSchema);