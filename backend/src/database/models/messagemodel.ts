import { Schema, model, Types, ObjectId } from "mongoose";

interface Message{
    sender: Types.ObjectId,
    content: string,
    chat: Types.ObjectId,
    readBy: Types.ObjectId
}

const messageSchema = new Schema<Message>(
    {
        sender:{
            type: Schema.Types.ObjectId,
            ref: "User",
            
        },
        content: {
            type: String,
            trim: true
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref:"Chat"
        },
       
    },
    {timestamps: true}
)

const messageModel = model<Message>("Message", messageSchema)

export {Message, messageModel}