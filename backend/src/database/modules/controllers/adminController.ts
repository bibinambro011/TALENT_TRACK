import { Response,Request } from "express";
import { adminService } from "./services/adminService";

const adminservice=new adminService()

export class adminController{
    async adminlogin(req:Request,res:Response){
        let data=req.body
        const result=await adminservice.adminlogin(data);
      try{
        if(result){
            if(result[0].password==data.password){

            }

        }else{
            res.status(401).json("invalid credentials")
        }
      }catch(error){

      }
    }
}