const express = require ('express');
const routes = require ('./Routes/Api');
const app = express ();
const bodyParser =require ('body-parser');
app.use(bodyParser.json()) ; 
// THIS SHOULD BE ABOVE app.use(routes);
app.use(routes); 
app.use((err,req,res,next)=>{
   res.status(422).send({error:err.message});
});
const mongoose =require('mongoose');
// THIS SHOULD BE ABOVE app.listen
// This will connect to mongo DB and create studentDb
app.listen(process.env.port ||4000,()=>{
   console.log(("Now Listening For Requests On:http://localhost:4000"));
});

mongoose.connect('mongodb://localhost/studentdb')


