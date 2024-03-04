import { AnyARecord } from "dns";
import { UserDto } from "../dtos/userDto";
import { agentRepository } from "../repositories/agentRepository";
import { UserRepository } from "../repositories/userREpository";
import { chatRepository } from "../repositories/chatRepository";


const chatrepository=new chatRepository()


export class chatService{

   async accessChat(userId:string,agentId:string){

    try{
        return await chatrepository.accessChat(userId,agentId)

    }catch(error:any){
        throw new Error(error)
    }

   } 

   // fetching all the chats 
   async fetchChats(userId:string){
    try{
        return await chatrepository.fetchChats(userId)
    }catch(error:any){

    }
   }

   // adding message

   async sendMessage(content:string,chatId:string,userId:string){
    try{
        return await chatrepository.sendMessage(content,chatId,userId)
    }catch(error:any){
        throw new Error(error)
    }
   }

   // fetching all of the messages

   async allMessages(chatId:string){
    try{
        return await chatrepository.allMessages(chatId)
    }catch(error:any){
        throw new Error(error)
    }
   }

}


