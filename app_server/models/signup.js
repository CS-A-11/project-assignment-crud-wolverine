
var mongoose=require('mongoose');
var bcrypt = require("bcryptjs");

var signupSchema = new mongoose.Schema({
  // signupID ={type:Number,required:true},
   name:{type:String,unique:true,required:true},
   email:{type:String,unique:true,required:true},
   password:{type:String,required:true},
   confirmpassword:{type:String,required:true},
   phone:{type:Number}
    
});

signupSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email }).exec(function(err, user) {
    if (err) {
      Console.log("error in authenticate");
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

//hashing a password before saving it to the database
signupSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User=mongoose.model("User",signupSchema);
module.exports=User;