import express from 'express';
import { UserController } from '../usercontroller';
import userAuth from "../../../../../midlewares/userauth"
import upload from '../../../../../Helper/multer';

const router = express.Router();
const userController = new UserController();

router.post('/userregister',upload.single('image'), userController.registerUser);
router.post("/userlogin",userController.userlogin)
router.post("/verifyotp",userController.verifyotp)
router.get("/getVerifiedagents",userController.getVerifiedagents)
router.get("/showavailableslots/:agentId",userController.agentAvailableSlots)
router.post("/userslotbooking",userController.userslotbooking)
router.get("/agentCategory",userController.agentCategory)
router.get("/getagentByName",userController.getagentByName);
router.get("/getUserById",userController.getUserById)
router.get("/userbookings",userController.userbookings)
export default router;
