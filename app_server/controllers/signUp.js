var bcrpyt=require("bcryptjs");
var mongoose=require("mongoose");
var User = mongoose.model("User");

module.exports.signUp = function(req, res) {
    res.render("signUp", {
      title: "signUp FoodSetGo!",
    });
  };
  
module.exports.signUpCreate = function(req, res) {

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmpassword:req.body.confirmpassword,
      phone:req.body.phone,
    },
    function(err, user) {
      if (err) {
        //sendJSONresponse(res, 400, err);
        console.log(err);
        return;
      } else {
        req.session.userId = user._id;
        console.log(user);
        //sendJSONresponse(res, 200, { status: "success" });
        //req.flash('success','You are now registered and can log in');
        res.redirect("/login");
      }
    }
  );
    // let user = new signup();
    // user.name=req.body.name;
    // user.email=req.body.email;
    // user.password=req.body.password;
    // user.confirmpassword=req.body.confirmpassword;
    // user.Number=req.body.Number;
    // user.save(function(err,user){
    //   if(err){
    //     console.log('Email Already Exists');
    //   }
    //   else
    //   {
    //     res.redirect("/login");
    //   }
    // });
    // return;
  };
      // const name=req.body.name;
      // const email=req.body.email;
      // const password=req.body.password;
      // const confirmpassword=req.body.confirmpassword;
      // const phone=req.body.phone;
      // req.checkBody();
      // req.checkBody('name', 'Name is required').notEmpty();
      // req.checkBody('email', 'email is required').notEmpty();
      // req.checkBody('email', 'email is not valid').isEmail();
      // req.checkBody('password', 'password is required').notEmpty();
      // req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password); 
      // req.checkBody()
      //  var errors=req.validationErrors();
      
      // if(errors)
      // {
      //   res.render('signUp',
      //   {
      //     errors:errors
      //   });
      // }else{
       
      //   let newUser;
      //     name:name;
      //     email:email;
      //     password:password;
      //     phone:phone
      //   }
      //   bcrypt.genSalt(10,function(err,salt)
      //   {
      //     bcrpyt.hash(newUser.password,salt,function(err,hash)
      //     {
      //       if(err)
      //       {
      //         console.log(err);
      //       };
      //       newUser.password=hash;
      //       newUser.save(function(err)
      //       {
      //         if(err)
      //         {
      //           console.log(err);
      //           return;
      //         }else{
      //           req.flash('success','You are now registered and can log in');
      //           res.redirect('/login');
      //         }
      //       });
      //     });
      //   });
      // }


