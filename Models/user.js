//email:type string required:true,lowercase:true unique:true
// password: type:string required true
const mongoose =require("mongoose");
const Schema = mongoose.Schema ;
const bycrypt =require('bcrypt')

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
userSchema.pre('save', async function(next){
    try{
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(this.password, salt);
        this.password =hashedPassword;
        next();
    }catch(error){
        next(error)

    }
});

 userSchema.methods.isValidPassword = async function(password){

 }
const User = mongoose.model('user',userSchema);
module.exports = User;