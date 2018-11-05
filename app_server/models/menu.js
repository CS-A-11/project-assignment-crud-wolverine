 var mongoose = require('mongoose');

var chiSchema = new mongoose.Schema({ 
    chiID: {type:Number,required:true},
   chiName: {type:String,required: true}
    
});

var contSchema = new mongoose.Schema({ 
    contID: {type:Number,required:true},
   contName: {type:String,required: true}
    
});

var fastSchema = new mongoose.Schema({ 
    fastID: {type:Number,required:true},
   fastName: {type:String,required: true}
    
});

 var menuSchema = new mongoose.Schema({ 
    // menuID= {type:Number,required:true},
     locName: {type:String,required: true},
    chinese: {type:mongoose.Schema.Types.ObjectId, ref:"Chinese"},
    continental: { type: mongoose.Schema.Types.ObjectId, ref: 'Continental'},
    fastfood: { type: mongoose.Schema.Types.ObjectId, ref: 'Fast'}
     
 });

 module.exports=mongoose.model("Menu", menuSchema);

//   mongoose.model('member',memberSchema);
module.exports=mongoose.model("Chinese", chiSchema); 
mongoose.model("Continental", contSchema); 
mongoose.model("Fast", fastSchema); 
