const JWT= require ('jsonwebtoken');
const creatError = require ('http-errors');
const { reject } = require('bcrypt/promises');
// const User = require ('../Models/user');
require("dotenv").config()

module.exports ={
    signAccessToken:(UserId) =>{
        return new Promise ((resolve,reject)=>{
            const payload ={}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options ={
                expiresIn :'1h',
                issuer:'Duke Technologies.com',
                audience:`${UserId}`,
            }
            JWT.sign(payload,secret,options,(error,token)=>{
                if(error) reject(error);
                resolve(token);
            })
        })
    },
    signRefreshToken:(UserId) =>{
        return new Promise ((resolve,reject)=>{
            const payload ={}
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options ={
                expiresIn :'1y',
                issuer:'MahadSaid Technologies.com',
                audience:UserId,
            }
            JWT.sign(payload,secret,options,(error,token)=>{
                if(error) reject(error);
                resolve(token);
            })
        })
    },

//  Middleware to verify token
verifyAccesToken:(req,res,next)=>{
    if (!req.headers["authorization"])
    return next (creatError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken =authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){
            return next(creatError.Unauthorized("Unauthorized User"))
        }
        req.payload = payload;
        next()
    })
},

verifyRefreshToken:(refreshToken)=>{
    return new Promise((resolve,reject)=>{
        JWT.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
            if(err){
                return reject(creatError.Unauthorized())
            }
            const UserId = payload.aud;
            resolve(UserId)
        });
    });
    
}
}