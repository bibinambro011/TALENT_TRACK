import { UserDto } from "../dtos/userDto";
import { agentRepository } from "../repositories/agentRepository";
import { UserRepository } from "../repositories/userREpository";


const agentrepository=new agentRepository()

export class agentService{

 async  registeragent(agentData:UserDto):Promise<any>{
    try{
        console.log("agent service",agentData)
        return agentrepository.create(agentData)
    }catch (error:any){
        throw new Error ("could not register agent")
    }
}
async agentlogin(data:UserDto){
    try{
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
}