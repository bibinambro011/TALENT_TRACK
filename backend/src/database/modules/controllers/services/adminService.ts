import { adminRepository } from "../repositories/adminRepository";


const adminrepository=new adminRepository()


export class adminService{
    async adminlogin(data:any){
        return adminrepository.adminlogin(data)
    }
}
