const Student = require ('../Models/students');
const mwanafunzi = require ('../Models/students')


module.exports ={
    students:(req, res)=>{
    mwanafunzi.find({}).then((Student)=>{
        res.send (Student);   
    })
    
}
}