import express from 'express';
import { agetController } from '../agentController';
const agentRouter = express.Router();
import upload from "../../../../../Helper/multer"
import { chatController } from '../chatController';

const agentController=new agetController()
const chatcontroller=new chatController()

agentRouter.post("/agentregister",upload.single('image'),agentController.registeragent)
agentRouter.post("/agentlogin",agentController.agentlogin)
agentRouter.post("/agentverifyotp",agentController.agentverifyotp);
agentRouter.post("/addpost",agentController.addpost);
agentRouter.post("/addslot",agentController.addslot);
agentRouter.get("/availableslots/:id",agentController.availableslots)
agentRouter.delete("/deletingslot",agentController.deletingslot)
agentRouter.get("/agentDetails",agentController.agentDetails)
agentRouter.get("/getAllSlots",agentController.getAllSlots)
agentRouter.get("/slotDetailsByOption",agentController.slotDetailsByOption)
agentRouter.delete("/agentslotcancell",agentController.agentslotcancell);
agentRouter.get("/slotbookingchangeStatus",agentController.slotbookingchangeStatus)
agentRouter.put("/editAgent",upload.single('image'),agentController.editAgent)

//chat routes
agentRouter.get("/agentAccessChat",chatcontroller.agentAccessChat)
agentRouter.post("/agentsendMessage",chatcontroller.agentsendMessage)

export default agentRouter