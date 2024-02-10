import mongoose, { Document, Model } from 'mongoose';
export interface AgentDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password:string;
    confirmPassword:string;
    otp:Number;
    otp_updated_at:Date;
    is_verified:boolean;
    role:string;
    is_blocked:boolean;
    image:string;
    certificate:string;
    category:string;
    experience:string;


}

const agentSchema = new mongoose.Schema<AgentDocument>({
   firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    otp: {
      type: Number,
      default:500,
    },
    otp_updated_at: {
      type: Date,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "agent",
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    image:{
      type:String,
      default:''
    },
    certificate:{
        type:String
    },
    category:{
        type:String
    },
    experience:{
        type:String
    }
   

  });
  
  const  agentModel : Model<AgentDocument>= mongoose.model("agentSchema", agentSchema);
  export default agentModel