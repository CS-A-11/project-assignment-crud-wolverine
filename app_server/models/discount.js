 var mongoose=require('mongoose');

var disSchema = new mongoose.Schema({
    //disID ={type:Number,required:true},
    //have to add restID and memberID
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
    member : { type: mongoose.Schema.Types.ObjectId, ref: 'Member' }
});

mongoose.model("Discount",disSchema); 