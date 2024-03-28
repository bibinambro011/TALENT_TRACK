import { userlog } from "../dtos/userDto";
import { adminRepository } from "../repositories/adminRepository";


const adminrepository=new adminRepository()


export class adminService{
    async adminlogin(data:userlog){
        try{
            return adminrepository.adminlogin(data)
        }catch(error){
            throw new Error("inavalid")
        }
        
    }
    async getuserdata(){
        try{
            return adminrepository.getuserdata()
        }catch(error){
            throw new Error("invalid")
        }
        
    }
    async getagentdata(){
        try{
            return adminrepository.getagentdata()
        }catch(error){
            throw new Error("invalid")
        }
        
    }
    async blockuser(email:any){
        try{
            return adminrepository.blockuser(email)

        }catch(error){
            throw new Error("invalid")
        }
    }
    async blockagent(email:any){
        try{
            return adminrepository.blockagent(email)

        }catch(error){
            throw new Error("invalid")
        }
    }
    async verifyagent(email:any){
        try{
            return adminrepository.verifyagent(email)

        }catch(error){
            throw new Error("invalid")
        }
    }

    async searchAgents(name:string){
        try{
            return  await  adminrepository.searchAgents(name)
        }catch(error:any){
            throw new Error(error)
        }
    }
    async searchUser(name:string){
        try{
            return  await  adminrepository.searchUser(name)
        }catch(error:any){
            throw new Error(error)
        }
    }

    async AllSlots(){
        try{
             return await adminrepository.AllSlots()

        }catch(error:any){
            throw new Error(error)
    }
}

async addDefaultSlots(data:any){
    try{
        return await adminrepository.addDefaultSlots(data)

   }catch(error:any){
       throw new Error(error)
}
}
async confirmedslots(){
    try{
         return await adminrepository.confirmedslots()

    }catch(error:any){
        throw new Error(error)
}
}
}
