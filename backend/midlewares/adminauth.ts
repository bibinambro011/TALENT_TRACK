import { NextFunction } from "express";
import { Request,Response } from "express";

import jwt from "jsonwebtoken"

const   adminAuth = async(req:Request,res:Response,next:NextFunction)=>{
    console.log("inside middleware")
   const authHeader = req.headers['authorization'];
   console.log("auth header is==>",authHeader)
   if(authHeader && authHeader.startsWith('Admin-Bearer')){
      const token = authHeader.split(' ')[1];    // Getting token from the header

      try {
         const decoded = jwt.verify(token, 'secretkey',(err,decoded)=>{
            console.log("decoded data is ==>",decoded)
            if(err){
               res.status(401).json({message:'Unauthorized'});
            }else{
             
               next();
            }
         })
      } catch (error) {
         res.status(401).json({message:'Unauthorized'});
      }
   }else{
      res.status(401).json({message:'Unauthorized'});
   }
}
export default adminAuth
