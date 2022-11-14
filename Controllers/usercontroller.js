const creatError = require ('http-errors');
const authSchema =require ('../Authentication/auth_schema');
const { signAccessToken,signRefreshToken} = require('../Authentication/jwtHelper');
const User = require ('../Models/user');

module.exports = {
    User:async(req,res,next)=>{
        try{
        //    const{email,password} = req.body;
         const {email,password} = await authSchema.validateAsync(req.body);
    
         const exists = await User.findOne({email:email});
    
         if(exists) throw creatError.Conflict(`${email} has already been registered`);
    
         const user = new User({email,password}); 
    
         const savedUser = user.save()
    
        // res.send("savedUser");
         const accessToken = await signAccessToken(savedUser.id)
         res.send({accessToken});
    } catch(err){
        next(err);
         
        }
     },
     login:async (req,res,next)=>{
        try{
         const {email,password} = await authSchema.validateAsync(req.body);
         const user = await User.findOne({email:email});
         if(!user) throw creatError.NotFound(`user not registered`);
    
         const isMatch = await user.isValidPassword(password);
         if (!isMatch) throw creatError.Unauthorized("Username or Password is not valid");
    
         const accessToken = await signAccessToken(user.id);
         const refreshToken = await signRefreshToken(user.id)
    
        //  const refreshToken = await signRefreshToken (user.id);
        res.send({accessToken,refreshToken})        
        } catch(error) {
            if (error.isJoi===true) 
            return next (creatError.BadRequest("Invalid Username or Password"))
            next(error);
        }
     },
     refresh: async (req,res,next)=>{
        try{
         const {refreshToken} = req.body ;
         if(!refreshToken) throw creatError.BadRequest();
    
         const userId = await verifyRefreshToken(refreshToken)
         const accessToken = await signAccessToken(userId);
         const refToken = await signRefreshToken(userId)
    
        //  const refreshToken = await signRefreshToken (user.id);
        res.send({accessToken:accessToken,refreshToken:refToken})        
        } catch(error) {
            if (error.isJoi===true) 
            return next (creatError.BadRequest("Invalid Username or Password"))
            next(error);
        }
     }
}