import adminModel from "../../../models/adminmodel";
import usersModel from "../../../models/usermodel";
import agentModel from "../../../models/agentmodels";
import { userlog } from "../dtos/userDto";
import { chatModel } from "../../../models/chatmodel";
import { messageModel } from "../../../models/messagemodel";
import { Error } from "mongoose";
import { ErrorCode } from "multer";

export class chatRepository{

  async accessChat(userId: string, agentId: string) {
    try {
        // Check if a chat exists between the given user and agent
        let isChat = await chatModel.findOne({
            $and: [
                { users: userId},
                { agent: agentId },
            ],
        }).populate([
            { path: "users", model: "userSchema" },  // Populate userSchema
             // Populate agentSchema
        ]).populate([
          { path: "agent", model: "agentSchema" },  // Populate userSchema
           // Populate agentSchema
      ]).populate("latestMessage")

      console.log("isChat==>",isChat)

        if (isChat) {
            return isChat;
        } else {
            // If no chat exists, create a new one
            let chatData = {
                chatName: "sender",
                users: userId,
                agent:agentId
            };

            const createdChat = await chatModel.create(chatData);
            const fullChat = await chatModel.findOne({ _id: createdChat._id })
                .populate(
                    { path: "users", model: "userSchema" },  // Populate userSchema
                    // Populate agentSchema
                )  .populate(
                  { path: "agent", model: "agentSchema" },  // Populate userSchema
                  // Populate agentSchema
              );

              console.log("full chat is ==>", fullChat)
            return fullChat;
        }
    } catch (error:any) {
        throw new Error(error);
    }
}


    // getting all the chats

    async fetchChats(userId:string){
        try {
           let data= await chatModel.find({ users: userId } )
          
              .populate("users")
              .populate("latestMessage")
              .sort({ updatedAt: -1 })
               let results = await usersModel.populate(data, {
                  path: "latestMessage.sender",
                  select: "firstName image email",
                });
             return results
             
          } catch(error:any){
            throw new Error(error)
        }
    }

    // adding messages

    async sendMessage(content:string,chatId:string,userId:string){
        var newMessage = {
            sender: userId,
            content: content,
            chat: chatId,
          };
          try {
            var message: any = await messageModel.create(newMessage);
      
            message = await message.populate("sender", "firstName image")
            message = await message.populate("chat")
            message = await usersModel.populate(message, {
              path: "chat.users",
              select: "username profilePicture email",
            });
      
            await chatModel.findByIdAndUpdate(chatId, { latestMessage: message });
            return message
          } catch (error:any) {
      
            throw new Error(error)
          }
    }

    // fetching all messages
    async allMessages(chatId:string){
        try {
            const messages = await messageModel.find({ chat:chatId })
              .populate("sender", "firstName image email")
              .populate("chat");
          return messages
          } catch (error:any) {
            throw new Error(error)
          }
    }

    //agentaccesschat 

    async agentAccessChat(agentId:string){
      try{
        let isChat = await chatModel.find({
         
              
              agent: agentId 
        
      }).populate([
          { path: "users", model: "userSchema" },  // Populate userSchema
           // Populate agentSchema
      ]).populate("latestMessage");
    return isChat
      }catch(error:any){
        throw new Error(error)
      }
    }

    // agent messages

 async agentsendMessage(content:string,chatId:string,agentId:string){
      var newMessage = {
        sender: agentId,
        content: content,
        chat: chatId,
      };
      try {
        var message: any = await messageModel.create(newMessage);
  
        message = await message.populate("sender", "firstName image")
        message = await message.populate("chat")
        message = await usersModel.populate(message, {
          path: "chat.agent",
          select: "firstName image email",
        });
  
        await chatModel.findByIdAndUpdate(chatId, { latestMessage: message });
        return message
      } catch (error:any) {
  
        throw new Error(error)
      }
}

async agentallMessages(chatId:string){
  try {
      const messages = await messageModel.find({ chat:chatId })
        .populate("sender", "firstName image email")
        .populate("chat");
    return messages
    } catch (error:any) {
      throw new Error(error)
    }
}

}