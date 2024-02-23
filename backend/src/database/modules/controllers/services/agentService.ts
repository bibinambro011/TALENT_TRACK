import { AnyARecord } from "dns";
import { UserDto } from "../dtos/userDto";
import { agentRepository } from "../repositories/agentRepository";
import { UserRepository } from "../repositories/userREpository";


const agentrepository=new agentRepository()

export class agentService{

 async  registeragent(agentData:any):Promise<any>{
    try{
        console.log("agent service",agentData)
        return agentrepository.create(agentData)
    }catch (error:any){
        throw new Error ("could not register agent")
    }
}
async agentlogin(data:any){
    try{
      console.log("ser5vice get called")
        return agentrepository.agentlogin(data)

    }catch(error){
        throw new Error("credentials are wrong")
    }
}

async agetDetails(agentData:UserDto):Promise<any>{
    try{
        console.log("agent service",agentData)
        return agentrepository.agentDetails(agentData)
    }catch (error:any){
        throw new Error ("could not register agent")
    }
}
async verifyotp(email:string){
    try{
      console.log("inside mail verifyotp in service",)
      return await agentrepository.verifyotp(email)
    }catch(error){
      throw new Error('Could not get user');
    }
  }
  async successVerify(email:string){
    try{
      return await agentrepository.successVerify(email)
    }catch(error){
      throw new Error('Could not get user');
    }
  }
  async addslot(data:any){
    try{
      return await agentrepository.addslot(data)
    }catch{
      throw new Error("failure adding slot")
    }
  }
  // sending data fetched from the repository to controller

  async availableslots(id:string){
    try{
      return await agentrepository.availableslots(id)
    }catch{
      throw new Error("failure fetching data")
    }
  }

  //deleting a slot and sending back the remaining slot

  async deletingslot(slotid:string,id:string){
    try{
      return await agentrepository.deletingslot(slotid,id)
    }catch{
      throw new Error("error deleting a a slot")
    }
  }
 async agentDetails(id:string){
    try{
      return await agentrepository.getAgentdetails(id)
    }catch{
      throw new Error("error fetching data")
    }
 }

 //fetching all booked slots 
 async getAllSlots(id:string){
  try{
    return  await agentrepository.getAllSlots(id)
  }catch{
    throw new Error("error fetching slots")
  }
 }

 //fetching slot by status type 
 async slotDetailsByOption(id:string,status:string){
  try{
    return await agentrepository.slotDetailsByOption(id,status)
  }
  catch{
    throw new Error("error fetching data")
  }
 }

 //fetching data from userRouter after deletiong slot 
 async agentslotcancell(slotId:string,agentId:string){
  try{
    return await agentrepository.agentslotcancell(slotId,agentId)
  }
  catch{
    throw new Error("error fetching data")
  }
 }
}