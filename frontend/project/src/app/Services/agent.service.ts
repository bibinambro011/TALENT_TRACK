import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userlog } from '../Model/userModel';
import { Observable } from 'rxjs';
import { Appointment, Booking, EditAgent, UserOtp, userAppointment } from '../Model/agentModel';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  api = 'http://localhost:4000';
  constructor(private http:HttpClient) { }

  agentlogin(userdetails:userlog):Observable<any>{
 
    return this.http.post<any>(`${this.api}/agents/agentlogin`,userdetails)
  }
  
  verifyUser(data:UserOtp):Observable<string>{
    console.log("otp details", data)
  
    return this.http.post<string>(`${this.api}/agents/agentverifyotp`,data)
  }
  addSlot(addedslots:Appointment):Observable<userAppointment>{
    console.log("added slots are==>", addedslots)
    return this.http.post<userAppointment>(`${this.api}/agents/addslot`,addedslots)
  }
  deletingslot(id:string,agentId:string):Observable<userAppointment>{
   
    return this.http.delete<userAppointment>(`${this.api}/agents/deletingslot?id=${agentId}&slotid=${id}`)
  }
  getAgentdetails(id:string):Observable<EditAgent>{
   
    return this.http.get<EditAgent>(`${this.api}/agents/agentDetails?id=${id}`)
  }
  availableslots(id:string):Observable<any>{
   
    return this.http.get<any>(`${this.api}/agents/availableslots/${id}`)
  }
  bookingdetails(id:string):Observable<Booking>{
  
    return this.http.get<Booking>(`${this.api}/agents/getAllSlots?id=${id}`)
  }
  slotDetailsByOption(agentId:string,status:string):Observable<any>{
    
    return this.http.get<any>(`${this.api}/agents/slotDetailsByOption?id=${agentId}&data=${status}`)
  }
  agentslotcancell(slotId:string,agentId:string):Observable<any>{
  
    return this.http.delete<any>(`${this.api}/agents/agentslotcancell?slotId=${slotId}&agentId=${agentId}`)
  }
  slotbookingchangeStatus(slotId:string,status:string,agentId:string):Observable<any>{
    return this.http.get<any>(`${this.api}/agents/slotbookingchangeStatus?status=${status}&slotId=${slotId}&agentId=${agentId}`)
}
editAgent(agentdata:any):Observable<EditAgent>{
  
  return this.http.put<EditAgent>(`${this.api}/agents/editAgent`,agentdata)
}

}