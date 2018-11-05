 var mongoose = require( 'mongoose' );

 var memberSchema = new mongoose.Schema({ 
     //memberID= {type:Number,required:true},
     memberName:{type:String,required: true},
     memberEmail:{type:String,required: true}
 });



 mongoose.model("Member", memberSchema); 
