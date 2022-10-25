const express = require ('express');
const routes = express.Router();
const creatError = require ('http-errors');
 const authSchema =require ('../Authentication/auth_schema');
const User = require ('../Models/user');
const { signAccessToken, verifyAccesToken } = require('../Authentication/jwtHelper');



// === GET A LIST OF STUDENTS FROM DATABASE ===
routes.get('/students',verifyAccesToken,(req, res)=>{
    res.send ({type:'Get Request'});
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

const Student = require ('../Models/students');

// add student to the DB
 routes.post('/students',(req,res)=>{
    Student.create(req.body).then(mwanafunzi =>{
         res.send(mwanafunzi);
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

routes.post('/user', async(req,res,next)=>{
    try{
    //    const{email,password} = req.body;
     const {email,password} = await authSchema.validateAsync(req.body);

     const exists = await User.findOne({email:email});

     if(exists) throw creatError.Conflict(`${email} has already been registered`);

     const user = new User({email,password}); 

     const savedUser = user.save()

    //  res.send("savedUser");
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
    //  const refreshToken = await signRefreshToken (user.id);
    res.send({accessToken})        
    } catch(error) {
        if (error.isJoi===true) 
        return next (creatError.BadRequest("Invalid Username or Password"))
        next(error)
    }
 })




module.exports = routes;
