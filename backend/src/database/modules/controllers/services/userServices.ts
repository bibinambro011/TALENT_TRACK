import { UserRepository } from '../repositories/userREpository';
import { UserDto } from '../dtos/userDto';


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
}
