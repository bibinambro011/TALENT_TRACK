import express from 'express';
import { UserController } from '../usercontroller';
import userAuth from "../../../../../midlewares/userauth"

const router = express.Router();
const userController = new UserController();

router.post('/userregister', userController.registerUser);
router.post("/userlogin",userController.userlogin)
router.post("/verifyotp",userController.verifyotp)
router.get("/getVerifiedagents",userController.getVerifiedagents)

export default router;
