import adminModel from "../../../models/adminmodel";
import usersModel from "../../../models/usermodel";
import agentModel from "../../../models/agentmodels";
import { userlog } from "../dtos/userDto";
import addagentslot from "../../../models/agentaddslot";
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
            
            return agents;
        } catch (error:any) {
            throw new Error(error);
        }
    }
    
    async  AllSlots() {
        try {
            let data= await addagentslot.find().populate('bookedUserId').populate("agentId")
            return data
        } catch (error: any) {
            throw new Error(error);
        }
    }

   
    
    async  addDefaultSlots(data: any) {
        try {
            const { startdate, enddate, time, agentId } = data;
            
            // Convert startdate and enddate to Date objects
            const startDate = new Date(startdate);
            const endDate = new Date(enddate);
    
            // Loop through each date within the provided range
            for (let currentDate = new Date(startDate); currentDate.getTime() <= endDate.getTime(); currentDate.setDate(currentDate.getDate() + 1)) {
    
                // Construct data for the current date
                const dataForCurrentDate = {
                    agentId: agentId,
                    date: new Date(currentDate), // Create a new Date object to avoid mutation
                    time: time,
                    booked: false,
                    bookedUserId: null, // Assuming no booking initially
                    // Add any other properties to the data object as needed
                };
    
                // Create a document for the current date
                let res = await addagentslot.create(dataForCurrentDate);
            }
    
            return "successfully added";
        } catch (error:any) {
            throw new Error(error);
        }
    }
    
    // all confirmedslots

    async  confirmedslots() {
        try {
            let data= await addagentslot.find({booked:true}).populate('bookedUserId').populate("agentId")
            return data
        } catch (error: any) {
            throw new Error(error);
        }
    }
    
}