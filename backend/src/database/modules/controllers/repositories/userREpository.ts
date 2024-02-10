import usersModel from "/Users/User/Desktop/secondProject/backend/src/database/models/usermodel";
import { UserDto } from "../dtos/userDto";
import { comparePass } from "../../../../../Helper/passwordhash";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

export class UserRepository {
  async create(userData: UserDto): Promise<any> {
    try {
      return await usersModel.create(userData);
    } catch (error) {
      throw new Error("Could not create user");
    }
  }
  async getUser(data: any): Promise<any> {
    try {
      let info: any = await usersModel.findOne({ email: data.email });
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
         
          usertoken:token,
          userdetails:{
            id:info._id,
            name:info.firstName,
            email:info.email,
            image:info.image,
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
  async getUserdetails(email: string) {
    try {
      let userdata = await usersModel.find({ email: email });
      return userdata;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async verifyotp(email:string){
    try{
      let userdata=await usersModel.find({email:email})
      return userdata
    }catch(error:any){
      throw new Error(error.message)
    }
  }
  async successVerify(email:string){
    try{
      let userdata=await usersModel.find({email:email})
     userdata[0]. is_verified=true;
     const updatedUser = await userdata[0].save();
     
    }catch(error:any){
      throw new Error(error.message)
    }
  }
}
