import mongoose, { Document, Model } from 'mongoose';
export interface AdminDocument extends Document {
   
    email: string;
    password:string;
  

}

const adminSchema = new mongoose.Schema<AdminDocument>({
  
    email: {
      type: String,
    },
    password: {
      type: String,
    },
   

  });
  
  const  adminModel : Model<AdminDocument>= mongoose.model("adminSchema", adminSchema);
  export default adminModel