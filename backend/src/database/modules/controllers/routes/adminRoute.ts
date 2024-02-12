import express from 'express';
import { agetController } from '../agentController';
import { adminController } from '../adminController';
import adminAuth from '../../../../../midlewares/adminauth';
const adminRouter = express.Router();

 const admincontroller=new adminController()


adminRouter.post("/adminlogin",admincontroller.adminlogin)
adminRouter.get("/getuserdata",adminAuth,admincontroller.getuserdata)
adminRouter.get("/getagentdata",adminAuth,admincontroller.getagentdata)
adminRouter.post("/blokUser",adminAuth,admincontroller.blokUser);
adminRouter.post("/blokagent",adminAuth,admincontroller.blokagent)
adminRouter.post("/agentVerify",adminAuth,admincontroller.verifyagent)



export default adminRouter