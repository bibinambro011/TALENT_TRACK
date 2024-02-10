import adminModel from "../../../models/adminmodel";
export class adminRepository{
    async adminlogin(data:any){
        try{
            return adminModel.find({email:data.email})
        }catch(error:any){
            throw new Error("invalid credentials")
        }
        
    }
}