import { comparePass } from "../../../../../Helper/passwordhash";
import agentModel from "../../../models/agentmodels";
import addagentslot from "../../../models/agentaddslot"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"


dotenv.config()
import { UserDto } from "../dtos/userDto";
import upload from '../../../../../Helper/multer';


export class agentRepository{
    
    async create(agentData: any): Promise<any> {
        try {
          const uploads=upload.single('image')
          return await agentModel.create(agentData);
        } catch (error) {
          throw new Error("Could not create agent");
        }
      }
      async agentDetails(agentData: any): Promise<any> {
        try {
          return await agentModel.find({email:agentData.email});
        } catch (error) {
          throw new Error("Could not create agent");
        }
      }
      async agentlogin(data: any): Promise<any> {
        try {
          let info: any = await agentModel.findOne({ email: data.email });
          console.log("repository==>",info)
         if(!info){
          return null
         }
    
          let isValidPassword = await comparePass(data.password, info.password);
          if (!isValidPassword) {
            console.log("password missmatch")
            return "password mismatch";
            
          }else{
            if(info.is_blocked){
              console.log("you are blocked by the admin");
              return "you are blocked by the admin"
             
              
            }
            const token=  jwt.sign(info.email,"secretKey")
            const accesseduser={
             
              agenttoken:token,
              userdetails:{
                id:info._id,
                name:info.firstName,
                email:info.email,
                image:info.image,
                verified:info.is_verified,
                category:info.category,
                role:info.role
              }
             
            }
            console.log("accesseduser is==>",accesseduser)
            return accesseduser
          }
        } catch (error: any) {
          throw new Error("Could not find user");
        }
      }
      async verifyotp(email:string){
        try{
          let userdata=await agentModel.find({email:email})
          return userdata
        }catch(error:any){
          throw new Error(error.message)
        }
      }
      async successVerify(email:string){
        try{
          let userdata=await agentModel.find({email:email})
        //  userdata[0]. is_verified=true;
         const updatedUser = await userdata[0].save();
         
        }catch(error:any){
          throw new Error(error.message)
        }
      }
      
//agent adding posts
async addpost(data:any){
  try{
    const ref=data.agentId.ref
  }catch{
    throw new Error("error adding posts")
  }
}

//slot add 
async addslot(data:any){
  try{
   await addagentslot.create(data);
   let total=await addagentslot.find({agentId:data.agentId,booked:false})
    return total
  }catch{
    throw new Error("failure adding slot")
  }
 
}

//fetching avilable slots to display in the agent side tro showvase for cancelling;
async availableslots(id:string){
  try{
    let availableslots=await addagentslot.find({agentId:id,booked:false})
    return availableslots

  }catch{
    throw new Error("error fetching data")
  }
}

// deleting a slot a  slot and sending back the remaining slot
async deletingslot(slotid:string,id:string){
  try{
    console.log("deleting iod is==>",slotid)
    await addagentslot.deleteOne({_id:slotid});
    let totalslot=await addagentslot.find({agentId:id,booked:false});
    return totalslot
  }catch{
    throw new Error("error deleting a slot")
  }
}

async getAgentdetails(id:string){
  try{
    
    return await agentModel.find({_id:id});
    
  }catch{
    throw new Error("error deleting a slot")
  }
}
}