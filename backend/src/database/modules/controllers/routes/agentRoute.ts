import express from 'express';
import { agetController } from '../agentController';
const agentRouter = express.Router();
import upload from "../../../../../Helper/multer"

const agentController=new agetController()

agentRouter.post("/agentregister",upload.single('image'),agentController.registeragent)
agentRouter.post("/agentlogin",agentController.agentlogin)
agentRouter.post("/agentverifyotp",agentController.agentverifyotp);
agentRouter.post("/addpost",agentController.addpost);
agentRouter.post("/addslot",agentController.addslot);
agentRouter.get("/availableslots/:id",agentController.availableslots)
agentRouter.delete("/deletingslot",agentController.deletingslot)



export default agentRouter