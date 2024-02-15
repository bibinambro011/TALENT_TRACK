import { comparePass } from "../../../../../Helper/passwordhash";
import agentModel from "../../../models/agentmodels";
import addagentslot from "../../../models/agentaddslot"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"


dotenv.config()
import { UserDto } from "../dtos/userDto";
import upload from '../../../../../Helper/multer';


export class agentRepository{
    
    async create(agentData: UserDto): Promise<any> {
        try {
          const uploads=upload.single('image')
          return await agentModel.create(agentData);
        } catch (error) {
          throw new Error("Could not create agent");
        }
      }
      async agentDetails(agentData: UserDto): Promise<any> {
        try {
          return await agentModel.find({email:agentData.email});
        } catch (error) {
          throw new Error("Could not create agent");
        }
      }
      async agentlogin(data: any): Promise<any> {
        try {
          let info: any = await agentModel.findOne({ email: data.email });
         if(!info){
          return null
         }
    
          let isValidPassword = await comparePass(data.password, info.password);
          if (!isValidPassword) {
            return "password mismatch";
          }else{
            if(info.is_blocked){
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
    return true
  }catch{
    throw new Error("failure adding slot")
  }
 
}
}