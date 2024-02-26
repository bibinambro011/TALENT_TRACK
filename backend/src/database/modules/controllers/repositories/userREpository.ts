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
        { $set: { bookedUserId: data.userId,booked:true,status:'Confirmed' } } 
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

  //fetching bookings based on status

  async userbookings(status: string, id: string) {
    try {
       
        if (status === 'All') {
            let dta= await userBookingModel.find({ userId: id }).populate('agentId').exec();
          
            return dta
            
        } else {
            let data = await userBookingModel.find({ userId: id, status: status }).populate('agentId').exec();
            console.log(data);
            return data;
        }

    } catch (error) {
        throw new Error("error fetching data");
    }
}
// cancel booking 

async cancelbooking(id: string, userid: string, status: string, amountrefund: string) {
  try {
    let datas = await userBookingModel.findOne({ _id: id });
    console.log("datas===>", datas);

    // Ensure datas?.bookingamount is properly cast to a number
    let bookingAmount = datas?.bookingamount ? parseFloat(datas.bookingamount) : 0;
    let refundAmount = parseFloat(amountrefund);

    let finalamount: number = bookingAmount - refundAmount;
    await userBookingModel.updateOne({ _id: id }, { $set: { status: 'cancelled', refundamount: refundAmount,bookingamount:finalamount } });
    let user=await usersModel.find({_id:userid})
    let updatedamount=user[0].wallet+Number(amountrefund)
    await usersModel.updateOne({_id:userid},{$set:{wallet:updatedamount}})
    let data = await userBookingModel.find({ userId: userid, status: status }).populate('agentId').exec();

    console.log("inside repo==>", data);
    return data;
  } catch (error) {
    console.error("Error cancelling slot:", error);
    throw new Error("Error cancelling slot");
  }
}


//editing user and sending updated info to user

async editUser(data:any){
  try{
    if(data.image){
  await usersModel.updateMany({_id:data.userId},{$set:{firstName:data.firstName,lastName:data.lastName,image:data.image}});
  return usersModel.find({_id:data.userId})
} else{
  await usersModel.updateMany({_id:data.userId},{$set:{firstName:data.firstName,lastName:data.lastName}});
  return usersModel.find({_id:data.userId})
}  
  }catch{
    throw new Error("error fetching data")
}

}

// finding slot to cancel
async findCancellingSlot(id:string){
  try{
    return await userBookingModel.find({_id:id})
  }catch(error:any){
    throw new Error(error)
  }
}


async paymentSuccess(data:any,razorpay_payment_id:string){
  try{
    try {
      
      await addagentslot.updateOne(
        { _id: data.slotId },
        { $set: { bookedUserId: data.userId,booked:true,status:'Confirmed',paymentstatus:'paid' } } 
      );
      data.paymentId=razorpay_payment_id
      data.bookingamount=data.bookingamount
     await userBookingModel.create(data);
     return addagentslot.find({agentId:data.agentId,booked:false})
     
    } catch(error:any) {
      throw new Error(error);
    }
  }catch{
    throw new Error("error adding payment")
  }
}

async paymentfailure(data:any){
  try{
    try {
      
      await addagentslot.updateOne(
        { _id: data.slotId },
        { $set: { bookedUserId: data.userId,booked:true,status:'pending',paymentstatus:'failed' } } 
      );
      
     await userBookingModel.create(data);
     return addagentslot.find({agentId:data.agentId,booked:false})
     
    } catch {
      throw new Error("failed to add booking details");
    }
  }catch{
    throw new Error("error adding payment")
  }
}
}
