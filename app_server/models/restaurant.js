 var mongoose = require( 'mongoose' );


 var contactSchema = new mongoose.Schema({ 
     contactID: {type:Number,required:true},
     contactName: {type:String,required: true},
     contactSub:{type:String,required: true},
     contactEmail:{type:String,required: true},
     contactPhone:{type:String,required: true},
     
 });
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
    menuID: {type:Number,required:true},
    chinese:[chiSchema],
   continental:[contSchema],
   fastfood:[fastSchema], 
    chinese: { type: mongoose.Schema.Types.ObjectId, ref: 'Chinese'},
   continental: { type: mongoose.Schema.Types.ObjectId, ref: 'Continental'},
   fastfood: { type: mongoose.Schema.Types.ObjectId, ref: 'Fast'}
    
});


var locationSchema = new mongoose.Schema({ 
    locID: {type:Number,required:true},
    locName: {type:String,required: true}
    
});


var restSchema=new mongoose.Schema({

    // restID:{type:number,required:true},
    restName:{type:String,required:true},
    locations:{ type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
    menu:{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu'},
    contact:{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});

mongoose.model("Restaurant", restSchema); 

mongoose.model("Location", locationSchema); 
mongoose.model("Contact", contactSchema); 
// mongoose.model("Menu", menuSchema);  