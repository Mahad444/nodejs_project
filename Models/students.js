const mongoose =require ('mongoose');
const Schema= mongoose.Schema;
const studentSchema = new Schema({
    firstname:{
        type:String,
        required:[true,"FirstName is Required"]
    },
    lastname:{
        type:String,
        required:[true,"LastName is Required"]
    },
    gender:{
        type:String,
        required:[false]
    }
});

const Student = mongoose.model('student',studentSchema);
// this is creating a model that's going to represent our collection in the DB


module.exports = Student;
// Here We are Going to export this file so that we can use it in other files


