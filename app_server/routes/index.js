var express = require("express");
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
var bcrpyt=require('bcryptjs');
var ctrlHome = require("../controllers/home");
var ctrlOthers = require("../controllers/others");
var ctrllogin = require("../controllers/login");
var ctrlsignUp = require("../controllers/signUp");
var ctrlorders = require("../controllers/orders");
var ctrlfeedback = require("../controllers/feedback");
var ctrlmain=require("../controllers/main");
var ctrlrest=require("../controllers/rest");
var ctrlmenu=require("../controllers/menu");
<<<<<<< HEAD
var ctrlmenus=require("../controllers/menus");
=======
>>>>>>> 018408f96efa061166d3d05643f1c0eb9a6425de
 /* Locations pages */
//  router.get("/", ctrlHome.homelist);
//  router.get("/location", ctrlHome.locationInfo);
//  router.get("/location/review/new", ctrlHome.addReview); 

  router.get("/",ctrlmain.index);
  router.post("/",ctrlmain.contact2);
/* Other pages*/
router.get("/about", ctrlOthers.about);

router.get("/login", ctrllogin.login);
router.post("/login", ctrllogin.userLogin);
router.get("/logout", ctrllogin.logout);

router.get("/signup", ctrlsignUp.signUp);
router.post("/signup",ctrlsignUp.signUpCreate);

router.get("/orders", ctrlorders.orders);
router.post("/orders", ctrlorders.orderSchema);


router.get("/feedback/add", ctrlfeedback.feedRead);
router.post("/feedback/add",ctrlfeedback.feedCreate);
<<<<<<< HEAD
router.get("/feedback/add/read",ctrlfeedback.feedReadAll);
=======
>>>>>>> 018408f96efa061166d3d05643f1c0eb9a6425de
// router.post("/rest/:restid/reviews", ctrlfeedback.reviewsCreate);
// router.get(
//   "/rest/:restid/reviews/:reviewid",
//   ctrlfeedback.reviewsReadOne
// );
// router.put(
//   "/rest/:restid/reviews/:reviewid",
//   ctrlfeedback.reviewsUpdateOne
// );
// router.delete(
//   "/rest/:restid/reviews/:reviewid",
//   ctrlfeedback.reviewsDeleteOne
// );
//router.post("/feedback/add",ctrlfeedback.feedCreate);
//router.get("/feedback/:feedbackid",ctrlfeedback.feedReadrev);

router.get("/rest",ctrlrest.home);
router.get("/rest", ctrlrest.restListByDistance);
//router.post("/rest", ctrlrest.restCreate);
//router.get("/rest/:restid", ctrlrest.restReadOne);
router.get("/rest/:restid",ctrlrest.restInfo);

router.get("/menu",ctrlmenu.home);
<<<<<<< HEAD
router.get("/menu/order",ctrlmenus.orderPlaced);
=======
>>>>>>> 018408f96efa061166d3d05643f1c0eb9a6425de

module.exports = router;
