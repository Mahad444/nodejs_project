const express = require ('express');
const routes = express.Router();
const creatError = require ('http-errors');
 const authSchema =require ('../Authentication/auth_schema');
const User = require ('../Models/user');
const { signAccessToken, verifyAccesToken,verifyRefreshToken ,signRefreshToken} = require('../Authentication/jwtHelper');
const mwanafunzi = require ('../Models/students')
const Student = require ('../Models/students');

// const {accessToken} = require ('./Authentication/auth_schema')


// === GET A LIST OF STUDENTS FROM DATABASE ===
routes.get('/students',verifyAccesToken,(req, res)=>{
    mwanafunzi.find({}).then((Student)=>{
        res.send (Student);   
    })
    
});
// === UPDATE STUDENTS IN DATABASE ===
//   routes.put('/student/:id', (req, res)=>{
    // res.send ({type:'Update Request'});
//  });
routes.put('/students/:id', (req, res,next)=>{
    Student.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        Student.findOne({id:req.params.id},req.body).then((mwanafunzi)=>{
            res.send(mwanafunzi);
    });   
        })
    });
    
// === DELETE A STUDENTS FROM DATABASE ===
// routes.delete('/students/:id', (req, res)=>{
//     res.send ({type:'Delete Request'});
// });
routes.delete('/students/:id', (req, res,next)=>{
    Student.findByIdAndRemove({_id:req.params.id}).then((student)=>
    { res.send(student)});
});


// add student to the DB
 routes.post('/students',(req,res)=>{
    Student.create(req.body).then(mwanafunzi =>{
         res.send(mwanafunzi);
    })
 })
routes.get('/user',verifyAccesToken,async(req,res)=>{
    User.find({}).then((User)=>{
        res.send(User)
    })
})
// routes.post('/user', async (req, res,next) =>{
//     try{
//     const{email,password} = req.body;

//     const results = await authSchema.validateAsync(req.body);

//     const exists = await User.findOne({email:email});

//     if(exists) throw creatError.Conflict(`${email}has already been registered`);

//     const user = new User(results); 
//     const savedUser = await  user.save()
//      res.send("savedUser");

//     const accessToken = await signAccessToken(savedUser.id)
//     res.send({accessToken});
// } catch(err){
//     next(err);
// }
    
// })

routes.post('/user',async(req,res,next)=>{
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
 })


 routes.post('/login',async (req,res,next)=>{
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
 })

 routes.post('/refresh-token',async (req,res,next)=>{
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
 })




module.exports = routes;
