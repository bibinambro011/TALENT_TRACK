import { Response, Request } from "express";
import { adminService } from "./services/adminService";
import { userlog } from "./dtos/userDto";
import jwt from "jsonwebtoken"
import { Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { agentService } from "./services/agentService";

const secret=process.env.jwtsecrettoken as string
// creating an instance of the adminservice class
const adminservice = new adminService();

// creating adminController
export class adminController {
  async adminlogin(req: Request, res: Response) {
    let data: userlog = req.body;
    const result = await adminservice.adminlogin(data);
    try {
      if (result[0]) {
        if (result[0].password == data.password) {
         let admintoken=jwt.sign(data.email,secret)
          res.status(200).json(admintoken);
        } else {
          res.status(401).json("invalid credentials");
        }
      } else {
        res.status(401).json("invalid credentials");
      }
    } catch (error) {}
  }

  // getting userdata and sending it to the client side
  // method get

  async getuserdata(req: Request, res: Response) {
    try {
      const data = await adminservice.getuserdata();
      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }

  // sending agent details to the client side
  // method get

  async getagentdata(req: Request, res: Response) {
    try {
      const data = await adminservice.getagentdata();
      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }

  // blocking user
  // method post

  async blokUser(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("data is in controll", data);
      const userdata = await adminservice.blockuser(data.email);
      if (userdata) {
        res.status(200).json("success");
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }

  // blocking agent 
  // method patch

  async blokagent(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("data is in controll", data);
      const userdata = await adminservice.blockagent(data.email);
      if (userdata) {
        res.status(200).json("success");
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }

  // verifying agent 
  // method post

  async verifyagent(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("data is in controll", data);
      const userdata = await adminservice.verifyagent(data.email);
      if (userdata) {
        res.status(200).json("success");
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }

  async searchAgents(req:Request,res:Response){
    console.log("serch controller==>", req.query.name)
    try{
      let name=req.query.name as string
      let agentdata=await adminservice.searchAgents(name)
      if(agentdata){
        res.status(200).json(agentdata)
      }
    }catch(error:any){
      throw new Error(error)
    }
   
  }
  async searchUser(req:Request,res:Response){
    try{
      let name=req.query.name as string
      let agentdata=await adminservice.searchUser(name)
      if(agentdata){
        res.status(200).json(agentdata)
      }
    }catch(error:any){
      throw new Error(error)
    }
   
  }
}
