import mongoose, { Schema, Document } from 'mongoose';

interface slotaddinterface extends Document {
  agentId: mongoose.Types.ObjectId;
  date: Date;
  time: string;

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
 
});

const addagentslot = mongoose.model<slotaddinterface>('agentslotadd', agentslotadd);

export default addagentslot;
