 var mongoose = require('mongoose');

// var chiSchema = new mongoose.Schema({ 
//     chiID: {type:Number,required:true},
//    chiName: {type:String,required: true}
    
// });

// var contSchema = new mongoose.Schema({ 
//     contID: {type:Number,required:true},
//    contName: {type:String,required: true}
    
// });

// var fastSchema = new mongoose.Schema({ 
//     fastID: {type:Number,required:true},
//    fastName: {type:String,required: true}
    
// });

//  var menuSchema = new mongoose.Schema({ 
//     // menuID= {type:Number,required:true},
//      locName: {type:String,required: true},
//     chinese: {type:mongoose.Schema.Types.ObjectId, ref:"Chinese"},
//     continental: { type: mongoose.Schema.Types.ObjectId, ref: 'Continental'},
//     fastfood: { type: mongoose.Schema.Types.ObjectId, ref: 'Fast'}
     
//  });


 var menuSchema = new mongoose.Schema({
  //- name: { type: String, required: true },
   //address: String,
  // rating: { type: Number, default: 0, min: 0, max: 5 },
   desc: String,
   price:String,
   pick:String
  // reviews: [reviewSchema],
  // reviews: {type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}
 });

 var menu=mongoose.model("menu", menuSchema);
 module.exports=menu;


