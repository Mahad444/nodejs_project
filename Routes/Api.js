const express = require ('express');
const routes = express.Router();

// === GET A LIST OF STUDENTS FROM DATABASE ===
routes.get('/students', (req, res)=>{
    res.send ({type:'Get Request'});
});
// === UPDATE STUDENTS IN DATABASE ===
//   routes.put('/student/:id', (req, res)=>{
    // res.send ({type:'Update Request'});
//  });
routes.put('/student/:id', (req, res,next)=>{
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
const creatError = require ('http-errors');
// const authSchema =require ('../Authentication/auth_schema');
const User = require('../Models/user');

routes.post('/user', async(req,res,next)=>{
    try{
       const{email,password} = req.body;
    //   const results = await authSchema.validateAsync(req.body);

    //    const exists = await User.findOne({email,password});
       if(exists) throw creatError.Conflict(`${email} has already been registered`);
   const user = new User({email,password}); 
     const savedUser = user.save()
     res.send("savedUser");
     const accessToken = await signAccessToken(savedUser.id)
     res.send({accessToken});
} catch(err){
    next(err);
     
    }
 })


module.exports = routes;
