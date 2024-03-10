import adminModel from "../../../models/adminmodel";
import usersModel from "../../../models/usermodel";
import agentModel from "../../../models/agentmodels";
import { userlog } from "../dtos/userDto";
export class adminRepository{
    async adminlogin(data:userlog){
        try{
            return adminModel.find({email:data.email})
        }catch(error:any){
            throw new Error("invalid credentials")
        }
        
    }
    async getuserdata(){
        try{
            return usersModel.find()
        }catch(error:any){
            throw new Error("invalid ")
        }
    }
    async getagentdata(){
        try{
            return agentModel.find()
        }catch(error:any){
            throw new Error("invalid ")
        }
    }
    async blockuser(email:any){
        try{
            const data:any=await usersModel.findOne({email:email})
            console.log("user in repository===>",data)
            if(data.is_blocked){
                data.is_blocked=false;
                data.save();
                return true
            }else{
                data.is_blocked=true;
                data.save();
                return true
            }
        }catch (error){
            throw new Error("invalid")
        }
    }
    async blockagent(email:any){
        try{
            const data:any=await agentModel.findOne({email:email})
            console.log("user in repository===>",data)
            if(data.is_blocked){
                data.is_blocked=false;
                data.save();
                return true
            }else{
                data.is_blocked=true;
                data.save();
                return true
            }
        }catch (error){
            throw new Error("invalid")
        }
    }
    async verifyagent(email:any){
        try{
            const data:any=await agentModel.findOne({email:email})
            console.log("user in repository===>",data)
            if(data.is_verified){
                data.is_verified=false;
                data.save();
                return true
            }else{
                data.is_verified=true;
                data.save();
                return true
            }
        }catch (error){
            throw new Error("invalid")
        }
    }

    async  searchAgents(name: string) {
        try {
            // Construct the regular expression using the name parameter
            const nameRegex = new RegExp(`^${name}`);
    
            // Use the regular expression to find agents
            const agents = await agentModel.find({ firstName: nameRegex });
            
            return agents;
        } catch (error:any) {
            throw new Error(error);
        }
    }

    async searchUser(name:string){
        try {
            // Construct the regular expression using the name parameter
            const nameRegex = new RegExp(`^${name}`);
    
            // Use the regular expression to find agents
            const agents = await usersModel.find({ firstName: nameRegex });
            console.log("agents are==>", agents)
            
            return agents;
        } catch (error:any) {
            throw new Error(error);
        }
    }
    
   
    
}