import { UserRepository } from '../repositories/userREpository';
import { UserDto,userBookingDocument } from '../dtos/userDto';


const userRepository = new UserRepository();

export class UserService {
  async registerUser(userData: UserDto): Promise<any> {
    try {
      return await userRepository.create(userData);
    } catch (error) {
      throw new Error('Could not register user');
    }
  }
  async getuser(data:any){
    try{
      return await userRepository.getUser(data)
    }catch(error:any){
    throw new Error('Could not register user');
  }
  }
  async userdetails(email:string){
    try{
      return await userRepository.getUserdetails(email)
    }catch(error){
      throw new Error('Could not get user');
    }
  }
  async verifyotp(email:string){
    try{
      return await userRepository.verifyotp(email)
    }catch(error){
      throw new Error('Could not get user');
    }
  }
  async successVerify(email:string){
    try{
      return await userRepository.successVerify(email)
    }catch(error){
      throw new Error('Could not get user');
    }
  }
  async getVerifiedagents(){
    try{
      return userRepository.getVerifiedagents()
    }catch(error:any){
      throw new Error(error.message)
    }
  }

  //getting available slots

  async agentAvailableSlots(id:any){
    try{
      return userRepository.agentAvailableSlots(id)
    }catch{
      throw new Error("error fetching slots")
    }
   
  }
// sending back slot status false agents slots
  async userslotbooking(data:userBookingDocument){
    try{
      return await userRepository.userslotbooking(data)
    }catch{
      throw new Error("error in adding user booking details")
    }
  }
  async agentCategory(item:string){
    try{
      return userRepository.agentCategory(item)
    }catch{
      throw new Error("error fetching data")
    }
  }

  //fetching agent by name 

  async getagentByName(item:string){
    try{
      console.log("inside service", item)
      return userRepository.getagentByName(item)
    }catch{
      throw new Error("error fetching data")
    }
  }
  async getUserById(id:any){
    try{
      return userRepository.getUserById(id)
      
    }catch{
      throw new Error("error fetching data")
    }
  }
  
  }
