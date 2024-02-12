import { NextFunction } from "express";
import { Request,Response } from "express";

import jwt from "jsonwebtoken"

const   userAuth = async(req:Request,res:Response,next:NextFunction)=>{
   const authHeader = req.headers['authorization'];
   if(authHeader && authHeader.startsWith('User-Bearer')){
      const token = authHeader.split(' ')[1];    // Getting token from the header

      try {
         const decoded = jwt.verify(token,"secretKey",(err,decoded)=>{
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
export default userAuth
