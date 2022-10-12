const express = require ('express');
const routes = express.Router();
// === GET A LIST OF STUDENTS FROM DATABASE ===
routes.get('/students', (req, res)=>{
    res.send ({type:'Get Request'});
});
// === UPDATE STUDENTS IN DATABASE ===
routes.put('/students/:id', (req, res)=>{
    res.send ({type:'Update Request'});
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
        res.send(req.body);
    })
})


module.exports = routes;
