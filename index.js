const express = require ('express');
const routes = require ('./Routes/Api');
const app = express ();
app.use(routes);
 app.listen(process.env.port ||4000,()=>{
    console.log(("Now Listening For Requests On:http://localhost:4000"));
 });


