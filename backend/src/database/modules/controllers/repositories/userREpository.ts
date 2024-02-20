import usersModel from "/Users/User/Desktop/secondProject/backend/src/database/models/usermodel";
import agentModel from "../../../models/agentmodels";
import addagentslot from "../../../models/agentaddslot";
import userBookingModel from "../../../models/userbooking";
import { UserDto,userBookingDocument } from "../dtos/userDto";
import { comparePass } from "../../../../../Helper/passwordhash";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config();

const jwtSecretToken: Secret = process.env.jwtsecrettoken as string;

// creating a userRepository class
export class UserRepository {
  async create(userData: UserDto): Promise<any> {
    try {
      return await usersModel.create(userData);
    } catch (error) {
      throw new Error("Could not create user");
    }
  }

  //  getting user

  async getUser(data: any): Promise<any> {
    try {
      let info: any = await usersModel.findOne({ email: data.email });
      if (!info) {
        return null;
      }

      let isValidPassword = await comparePass(data.password, info.password);
      if (!isValidPassword) {
        return "password mismatch";
      } else {
        if (info.is_blocked) {
          return "you are blocked by the admin";
        }
        const token = jwt.sign(info.email, jwtSecretToken);
        const accesseduser = {
          usertoken: token,
          userdetails: {
            id: info._id,
            name: info.firstName,
            email: info.email,
            image: info.image,
            category: info.category,
            role: info.role,
          },
        };
        console.log("accesseduser is==>", accesseduser);
        return accesseduser;
      }
    } catch (error: any) {
      throw new Error("Could not find user");
    }
  }
  //  fetching user details

  async getUserdetails(email: string) {
    try {
      let userdata = await usersModel.find({ email: email });
      return userdata;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // verifying otp

  async verifyotp(email: string) {
    try {
      let userdata = await usersModel.find({ email: email });
      return userdata;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  // confirming the email verification

  async successVerify(email: string) {
    try {
      let userdata = await usersModel.find({ email: email });
      userdata[0].is_verified = true;
      const updatedUser = await userdata[0].save();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  // fetching and sending only the verified agents

  async getVerifiedagents() {
    try {
      return agentModel.find({ is_verified: true });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  // sending all the available slots to the user
  async agentAvailableSlots(id: any) {
    try {
      return await addagentslot.find({ agentId: id });
    } catch {
      throw new Error("error fetching data");
    }
  }

  // adding user booking details

  async userslotbooking(data: userBookingDocument) {
    try {
      
      await addagentslot.updateOne(
        { _id: data.slotId },
        { $set: { bookedUserId: data.userId,booked:true } } 
      );
      
     await userBookingModel.create(data);
     return addagentslot.find({agentId:data.agentId,booked:false})
     
    } catch {
      throw new Error("failed to add booking details");
    }
  }

  // fetching particuar agent category and sending the details
  async agentCategory(type:string){
    try{
      return agentModel.find({category:type})
    }catch{
      throw new Error("error fetching data")
    }
  }
  
  //fetching agents by name
  async getagentByName(name:string){
    try{
      console.log("inside repo", name)
      return await agentModel.find({ firstName: { $regex: `${name}` } });
      
    }catch{
      throw new Error("error fetching data")
    }
  }
  //fetching user by id
  async getUserById(id:string){
    try{
      return await usersModel.find({_id:id})

    }catch{
      throw new Error("error fetching data")
    }
   
  }
}
