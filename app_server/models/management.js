var mongoose=require('mongoose');

var managementSchema =new mongoose.Schema(
    {
       // mangID={type:Number,required:true},
       managementName: {type:String, required:true},
        posts={type:String},
        member : { type: mongoose.Schema.Types.ObjectId, ref: 'Member' }
    }
);

mongoose.model("Management",managementSchema); 