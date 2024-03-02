import { UserDto } from "./dtos/userDto";
import { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt";
import generateMail from "../../../../Helper/mailOtp";
import { agentService } from "./services/agentService";
import cloudinary from "../../../../Helper/cloudinary";
import { UserService } from "./services/userServices";
import CustomError from "../../../../Helper/customError";
import { chatService } from "./services/chatservice";

const chatservice = new chatService();

export class chatController {

async accessChat(req: Request, res: Response) {
    const { userId,agentId } = req.body;
    console.log("body is==>",req.body)

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.status(400).json({ message: 'nouserFound' });
    }

    

    let data=await chatservice.accessChat(userId,agentId)

   res.status(200).json(data)


}
// getting all the avilable chat 

async fetchChats(req:Request,res:Response){
    try{
        let userId:string=req.query.id as string
        console.log("userId is==>",userId)
        let data:any=await chatservice.fetchChats(userId)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(401).json("error fetching chats")
        }

    }catch(error:any){
        throw new Error(error)
    }
}
   

}