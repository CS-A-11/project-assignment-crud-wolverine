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
/* Locations pages */
//  router.get("/", ctrlHome.homelist);
//  router.get("/location", ctrlHome.locationInfo);
//  router.get("/location/review/new", ctrlHome.addReview); 

  router.get("/",ctrlmain.index);
  router.post("/",ctrlmain.contact2);
/* Other pages*/
router.get("/about", ctrlOthers.about);
router.get("/login", ctrllogin.login);

router.get("/signUp", ctrlsignUp.signUp);
router.post("/signUp",ctrlsignUp.signUpCreate);

router.get("/orders", ctrlorders.orders);
router.post("/orders", ctrlorders.orderSchema);


router.get("/feedback/add", ctrlfeedback.feedRead);
router.post("/feedback/add",ctrlfeedback.feedCreate);
router.get("/feedback/:feedbackid",ctrlfeedback.feedReadrev);

module.exports = router;
