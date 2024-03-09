import express from 'express';
import { UserController } from '../usercontroller';
import { chatController} from "../chatController"
import userAuth from "../../../../../midlewares/userauth"
import upload from '../../../../../Helper/multer';

const router = express.Router();
const userController = new UserController();
const chatcontroller=new chatController()

router.post('/userregister',userAuth,upload.single('image'), userController.registerUser);
router.post("/userlogin",userController.userlogin)
router.post("/verifyotp",userController.verifyotp)
router.post("/userslotbooking",userAuth,userController.userslotbooking)
router.post("/paymentVerification",userAuth,userController.paymentVerification)

router.get("/getVerifiedagents",userAuth,userController.getVerifiedagents)
router.get("/showavailableslots/:agentId",userAuth,userController.agentAvailableSlots)
router.get("/agentCategory",userController.agentCategory)
router.get("/getagentByName",userController.getagentByName);
router.get("/getUserById",userController.getUserById)
router.get("/userbookings",userAuth,userController.userbookings);
router.get("/getKey",userController.getKey)

router.patch("/cancelbooking",userAuth,userController.cancelbooking)

router.post("/editUser",userAuth,upload.single('image'),userController.editUser);
router.post("/refreshtoken",userController.refreshtoken)

//chat routes
router.post("/accessChat",chatcontroller.accessChat)
router.get("/fetchChats",chatcontroller.fetchChats)
router.post("/sendMessage",chatcontroller.sendMessage)
router.get("/allMessages",chatcontroller.allMessages)

// transaction details
router.get("/userTransactionHistory",userController.userTransactionHistory)
router.post("/walletpayment",userController.walletpayment)

export default router;
