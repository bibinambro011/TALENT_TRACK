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

   async agentAccessChat(agentId:string){
    try{
        return await chatrepository.agentAccessChat(agentId)
    }catch(error:any){
        throw new Error(error)
    }
   }
// agent chats

async agentsendMessage(content:string, chatId:string,agentId:string){
    try{
        return await chatrepository.agentsendMessage(content,chatId,agentId)
    }catch(error:any){
        throw new Error(error)
    }
}

async agentallMessages(chatId:string){
    try{
        return await chatrepository.agentallMessages(chatId)
    }catch(error:any){
        throw new Error(error)
    }
   }

   
}


