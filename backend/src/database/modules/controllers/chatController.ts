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
   
// adding messages

async sendMessage(req:Request,res:Response){
    console.log("inside controller sendmessage")
    console.log(req.body)
    try{
       let {content,chatId,userId}=req.body;
       console.log(req.body)
       let data=await chatservice.sendMessage(content,chatId,userId);
       res.status(200).json(data)

    }catch(error:any){
        throw new Error(error)
    }
}

// getting all messages
async allMessages(req:Request,res:Response){
    try{
        let chatId:string=req.query.id as string
        let data=await chatservice.allMessages(chatId);
        res.status(200).json(data)
    }catch(error:any){
        throw new Error(error)
    }
}

async agentAccessChat(req:Request,res:Response){
    try{
        console.log("agent access chat==>",req.query.agentId)
        let agentId :string =req.query.agentId as string
        let data=await chatservice.agentAccessChat(agentId)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(400).json("error fetching data")
        }
    }catch(error:any){
        throw new Error(error)
    }
}

// adding agent messages
async agentsendMessage(req:Request,res:Response){
    try{
        let {content,chatId,agentId}=req.body;
        console.log("req.body is==>", req.body)
        let data=await chatservice.agentsendMessage(content,chatId,agentId);
        if(data){
            res.status(200).json(data)
        }else{
            res.status(400).json("error sending message")
        }

    }catch(error:any){
        throw new Error(error)
    }
}

async agentallMessages(req:Request,res:Response){
    try{
        let chatId:string=req.query.id as string
        let data=await chatservice.agentallMessages(chatId);
        res.status(200).json(data)
    }catch(error:any){
        throw new Error(error)
    }
}

}