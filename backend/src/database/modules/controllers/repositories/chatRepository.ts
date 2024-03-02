import adminModel from "../../../models/adminmodel";
import usersModel from "../../../models/usermodel";
import agentModel from "../../../models/agentmodels";
import { userlog } from "../dtos/userDto";
import { chatModel } from "../../../models/chatmodel";

export class chatRepository{

    async accessChat(userId:string,agentId:string){
        console.log("inside repo==>")
        var isChat: any = await chatModel.find({
            $and: [
              { users: { $elemMatch: { $eq: agentId } } },
              { users: { $elemMatch: { $eq: userId } } },
            ],
          })
            .populate("users")
            .populate("latestMessage");
      
          isChat = await usersModel.populate(isChat, {
            path: "latestMessage.sender",
            select: "firstName image email",
          });
      
      
          if (isChat.length > 0) {
        return (isChat[0]);
      
          } else {
            var chatData = {
              chatName: "sender",
              users: [agentId, userId],
           
            };
            console.log("users are===>",chatData)
      
            try {
              const createdChat = await chatModel.create(chatData);
              const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
                "users",
              );
           return (FullChat);
            } catch (error:any) {
            throw new Error(error)
            }
          }
    }

}