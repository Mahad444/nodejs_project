//email:type string required:true,lowercase:true unique:true
// password: type:string required true
const mongoose =require("mongoose");
const Schema = mongoose.Schema ;
const userSchema = new Schema({
    // Email
    email :({
    type:String,
    lowercase:true,
    unique:true,     
    required:true
    }),
    // Password
    password:{
        type:String,
        required:[true]
    } 
});


const User =mongoose.model('user',userSchema);
module.exports = User;