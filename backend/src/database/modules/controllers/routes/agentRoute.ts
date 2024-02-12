import express from 'express';
import { agetController } from '../agentController';
const agentRouter = express.Router();
import multerconfig from '../../../../../Helper/multer'

const agentController=new agetController()

agentRouter.post("/agentregister",multerconfig.single('image'),agentController.registeragent)
agentRouter.post("/agentlogin",agentController.agentlogin)
agentRouter.post("/agentverifyotp",agentController.agentverifyotp)


export default agentRouter