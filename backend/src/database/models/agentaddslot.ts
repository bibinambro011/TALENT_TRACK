import mongoose, { Schema, Document } from 'mongoose';

interface slotaddinterface extends Document {
  agentId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  booked:boolean;
  bookedUserId:mongoose.Types.ObjectId;


}

const agentslotadd: Schema = new Schema({
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'agentschema',
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
 }
});

const addagentslot = mongoose.model<slotaddinterface>('agentslotadd', agentslotadd);

export default addagentslot;
