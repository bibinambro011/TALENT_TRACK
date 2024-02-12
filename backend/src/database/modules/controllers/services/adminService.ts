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
            console.log("user id in service",email)
            return adminrepository.blockuser(email)

        }catch(error){
            throw new Error("invalid")
        }
    }
    async blockagent(email:any){
        try{
            console.log("user id in service",email)
            return adminrepository.blockagent(email)

        }catch(error){
            throw new Error("invalid")
        }
    }
    async verifyagent(email:any){
        try{
            console.log("user id in service",email)
            return adminrepository.verifyagent(email)

        }catch(error){
            throw new Error("invalid")
        }
    }
}
