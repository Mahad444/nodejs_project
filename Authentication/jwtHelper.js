const JWT= require ('jsonwebtoken');
const creatError = require ('http-errors')
const User = require ('../Models/user');
require("dotenv").config()

module.exports ={
    signAccessToken:(UserId) =>{
        return new Promise ((resolve,reject)=>{
            const payload ={}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options ={
                expiresIn :'1hr',
                issuer:'Duke Technologies.com',
                audience:UserId,
            }
            JWT.sign(payload,secret,options,(error,token)=>{
                if(error) reject(error);
                resolve(token);
            })
        })
    }
}