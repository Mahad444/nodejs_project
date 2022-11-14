const express = require ('express');
const routes = express.Router();
const {verifyAccesToken,verifyRefreshToken} = require('../Authentication/jwtHelper')
const userController = require('../Controllers/usercontroller')
const User = require('../Models/user')

// const {accessToken} = require ('./Authentication/auth_schema')


// === GET A LIST OF STUDENTS FROM DATABASE ===
routes.get('/students',verifyAccesToken,);
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

routes.post('/user',userController.User)


 routes.post('/login',userController.login)

 routes.post('/refresh-token',verifyRefreshToken,userController.refresh)


module.exports = routes;
