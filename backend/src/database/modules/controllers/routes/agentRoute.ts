import express from 'express';
import { agetController } from '../agentController';
const agentRouter = express.Router();

const agentController=new agetController()

agentRouter.post("/agentregister",agentController.registeragent)
agentRouter.post("/agentlogin",agentController.agentlogin)
agentRouter.post("/agentverifyotp",agentController.agentverifyotp)


export default agentRouter