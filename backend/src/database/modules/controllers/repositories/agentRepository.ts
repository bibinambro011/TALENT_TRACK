import { comparePass } from "../../../../../Helper/passwordhash";
import agentModel from "../../../models/agentmodels";
import userBookingModel from "../../../models/userbooking";
import addagentslot from "../../../models/agentaddslot"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"


dotenv.config()
import { UserDto } from "../dtos/userDto";
import upload from '../../../../../Helper/multer';
import transactionmodel from "../../../models/transactionmodel";
import usersModel from "../../../models/usermodel";


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
    let slot=await addagentslot.find({agentId:data.agentId})
   
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
    let availableslots=await addagentslot.find({agentId:id,booked:false,date:{$gt:new Date()}}).populate("agentId")
    return availableslots

  }catch{
    throw new Error("error fetching data")
  }
}

//fetching booked slots
async bookedslots(id:string){
  try{
    let confirmedSlots = await addagentslot.find({ 
      agentId: id,
      booked: true,
      $or: [
          { status: 'Confirmed' },
          { status: 'consulted' }
      ]
  }).populate("agentId").populate("bookedUserId");
  
    return confirmedSlots

  }catch{
    throw new Error("error fetching data")
  }
}


// deleting a slot a  slot and sending back the remaining slot
async deletingslot(slotid:string,id:string){
  try{
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

//fetching all the slots to display it in the agent side

async getAllSlots(id:string){
  try{
    let data= await addagentslot.find({agentId:id}).populate('bookedUserId').exec()
    return data
  }catch{
    throw new Error("error")
  }
}

//fetching slot details by status type

async slotDetailsByOption(id:string,status:string){
  try {
       
    if (status === 'All') {
        let dta= await addagentslot.find({ agentId: id }).populate('bookedUserId').exec();
      
        return dta
        
    } else {
        let data = await addagentslot.find({ agentId: id, status: status }).populate('bookedUserId').exec();
        return data;
    }

} catch (error) {
    throw new Error("error fetching data");
}
}

//getting slots after cancelling one

async agentslotcancell(slotid:string,agentId:string){
  try{
    await addagentslot.deleteOne({_id:slotid})
  let dta= await addagentslot.find({ agentId: agentId , status:'pending'}).populate('bookedUserId').exec();
  return dta
  }catch{
    throw new Error("error fetching data")
  }
  

}

// updating booking status that is user is rejection or coonsulted option is clicking
bookingamount:number=0
async  slotbookingchangeStatus(slotId:string,status:string,agentId:string){
try{
 
  let datas:any= await userBookingModel.findOne({slotId:slotId});
  let {userId,bookingamount}=datas
  bookingamount=bookingamount
  if(status=='agent cancelled'){
  await userBookingModel.updateOne({slotId:slotId},{$set:{status:status}});
  await addagentslot.updateOne({_id:slotId},{$set:{status:status}})
    await transactionmodel.create({userId:userId,agentId:agentId,refundamount:bookingamount})
    let user:any=await usersModel.findOne({_id:userId})
    let updatedamount=user.wallet+Number(bookingamount)
    await usersModel.updateOne({_id:userId},{$set:{wallet:updatedamount}})
    let data=await addagentslot.find({agentId:agentId,status:'Confirmed'}).populate("bookedUserId")

  return data
  }
  let amount=Number(bookingamount*2/100*10)
  await userBookingModel.updateOne({slotId:slotId},{$set:{status:status}});
  await addagentslot.updateOne({_id:slotId},{$set:{status:status,adminpaidAmount:amount}})
  let data=await addagentslot.find({agentId:agentId,status:"consulted"}).populate("bookedUserId")
  return data

}catch{
throw new Error("error fetching value")
}
}

//editing agent profile

async editAgent(data:any){
  try{
    if(data.image){
      let datas=await agentModel.updateOne({_id:data.agentId},{$set:{firstName:data.firstName,lastName:data.lastName,category:data.category
        ,experience:data.experience,clubConnections:data.clubConnections,image:data.image
      }})
      let agent=await agentModel.find({_id:data.agentId});
      return agent
    }else{
      let datas=await agentModel.updateOne({_id:data.agentId},{$set:{firstName:data.firstName,lastName:data.lastName,category:data.category
        ,experience:data.experience,clubConnections:data.clubConnections,
      }})
      let agent=await agentModel.find({_id:data.agentId});
      return agent
    }
    
  }catch{
    throw new Error("error fetching data")
  }
 
}

// get all slot details from userslotbooking 
async getAllSlotDetails(id:string){
  try{
    let data=await userBookingModel.find({agentId:id}).populate('agentId')
    return data
  }catch{
    throw new Error("error fetching data")
  }
}

}