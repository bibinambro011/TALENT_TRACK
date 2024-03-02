//chatName 
//user
//latestMessage
//
import { Schema, model, Types, ObjectId } from "mongoose";

interface Chat{
    chatName: string,
    users: Types.ObjectId,
    latestMessage: Types.ObjectId
}
const chatSchema = new Schema(
    {
        chatName:{
            type: String
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: "userSchema"
        }],
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
          },
    },
    {timestamps: true}
)

const chatModel = model<Chat>("Chat", chatSchema)
export {chatModel, Chat}