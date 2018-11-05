 var mongoose = require( 'mongoose' );

    contactSchema = new mongoose.Schema({ 
    
     contactName:{type:String,required: true},
     contactEmail:{type:String,required: true},
     contactSub:{type:String,required: true}, 
     contactMsg:{type:String,required: true},
     
 });

 var contact = mongoose.model("contact",contactSchema);
module.exports = contact;  