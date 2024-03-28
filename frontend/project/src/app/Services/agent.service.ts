import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userlog } from '../Model/userModel';
import { Observable } from 'rxjs';
import { Appointment, AuthResponse, Booking, BookingstausChange, EditAgent, UserDetails, UserOtp, getAllAgentBooking, userAppointment } from '../Model/agentModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private api:string=environment.api
  
  constructor(private http:HttpClient) { }

  agentlogin(userdetails:userlog):Observable<any>{
 
    return this.http.post<any>(`${this.api}/agents/agentlogin`,userdetails)
  }
  
  verifyUser(data:UserOtp):Observable<string>{
  
    return this.http.post<string>(`${this.api}/agents/agentverifyotp`,data)
  }
  addSlot(addedslots:Appointment):Observable<userAppointment>{
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
  bookedslots(id:string):Observable<any>{
   
    return this.http.get<any>(`${this.api}/agents/bookedslots?agentId=${id}`)
  }
  bookingdetails(id:string):Observable<Booking>{
  
    return this.http.get<Booking>(`${this.api}/agents/getAllSlots?id=${id}`)
  }
  slotDetailsByOption(agentId:string,status:string):Observable<BookingstausChange>{
    
    return this.http.get<BookingstausChange>(`${this.api}/agents/slotDetailsByOption?id=${agentId}&data=${status}`)
  }
  agentslotcancell(slotId:string,agentId:string):Observable<BookingstausChange>{
  
    return this.http.delete<BookingstausChange>(`${this.api}/agents/agentslotcancell?slotId=${slotId}&agentId=${agentId}`)
  }
  slotbookingchangeStatus(slotId:string,status:string,agentId:string):Observable<BookingstausChange>{
    return this.http.get<BookingstausChange>(`${this.api}/agents/slotbookingchangeStatus?status=${status}&slotId=${slotId}&agentId=${agentId}`)
}
editAgent(agentdata:any):Observable<EditAgent>{
  
  return this.http.put<EditAgent>(`${this.api}/agents/editAgent`,agentdata)
}

getAllslotDetails(agentId:string):Observable<getAllAgentBooking>{
  console.log("agent service with userbookig get called",agentId)
  
  return this.http.get<getAllAgentBooking>(`${this.api}/agents/getAllslotDetails?agentId=${agentId}`)
}

}