import mongoose, { Document, Model, Schema } from "mongoose";
export interface userBookingDocument extends Document {
  slotId: mongoose.Types.ObjectId;
  agentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  time: string;
  date: Date;
  status: string;
  paymentId:string;
  refundamount:string;
  bookingamount:string 
}

const userBookinSchema = new mongoose.Schema<userBookingDocument>({
  slotId: {
    type: Schema.Types.ObjectId,
  },
  agentId: {
    type: Schema.Types.ObjectId,
    ref:'agentSchema'
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  time: {
    type: String,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
    default:"confirmed"
  },
  paymentId:{
    type:String
  },
  
  bookingamount:{
    type:String 
  },
  refundamount:{
    type:String
  }
});

const userBookingModel: Model<userBookingDocument> = mongoose.model(
  "userBookinSchema",
  userBookinSchema
);
export default userBookingModel;
