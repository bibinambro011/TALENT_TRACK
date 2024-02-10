import express from 'express';
import { agetController } from '../agentController';
import { adminController } from '../adminController';
const adminRouter = express.Router();

 const admincontroller=new adminController()


adminRouter.post("/adminlogin",admincontroller.adminlogin)
adminRouter.get("/getuserdata",admincontroller.getuserdata)
adminRouter.get("/getagentdata",admincontroller.getagentdata)
adminRouter.post("/blokUser",admincontroller.blokUser);
adminRouter.post("/blokagent",admincontroller.blokagent)




export default adminRouter