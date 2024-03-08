import mongoose, { Model, Schema } from "mongoose";
export interface walletTransaction  {
  userId: mongoose.Types.ObjectId;
  agentId: mongoose.Types.ObjectId;
  date: Date;
  refundamount:string;
  paidamount:string 
}

const transactioSchema = new mongoose.Schema<walletTransaction>({
userId: {
        type: Schema.Types.ObjectId,
      },
agentId: {
    type: Schema.Types.ObjectId,
    ref:'agentSchema'
  },
 
  date: {
    type: Date,
  },
  paidamount:{
    type:String 
  },
  refundamount:{
    type:String
  },
  
},
{timestamps: true})
;

const transactionmodel: Model<walletTransaction> = mongoose.model(
  "transactionmodel",
  transactioSchema
);
export default transactionmodel;