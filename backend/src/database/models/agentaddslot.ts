import mongoose, { Schema, Document } from 'mongoose';

interface slotaddinterface extends Document {
  agentId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  booked:boolean;
  bookedUserId:mongoose.Types.ObjectId;
  adminpaidAmount:string


}

const agentslotadd: Schema = new Schema({
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'agentSchema',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  
  },
 
  time: {
    type: String,
  },
  booked:{
    type:Boolean,
    default:false
  },
  status:{
    type:String,
    default:"pending"
  },
 bookedUserId:{
  type: Schema.Types.ObjectId,
  ref:'userSchema'
 },
 paymentstatus:{
  type:String
 },
 bookingAmount:{
  type:String,
  default:'1500'
 },
 adminpaidAmount:{
  type:String
 }

});

const addagentslot = mongoose.model<slotaddinterface>('agentslotadd', agentslotadd);

export default addagentslot;
