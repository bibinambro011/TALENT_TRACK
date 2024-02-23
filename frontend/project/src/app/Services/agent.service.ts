import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userlog } from '../Model/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  api = 'http://localhost:4000';
  constructor(private http:HttpClient) { }

  agentlogin(data:userlog):Observable<any>{
 
    return this.http.post<any>(`${this.api}/agents/agentlogin`,data)
  }
  
  verifyUser(data:any):Observable<any>{
  
    return this.http.post<any>(`${this.api}/agents/agentverifyotp`,data)
  }
  addSlot(data:any):Observable<any>{
  
    return this.http.post<any>(`${this.api}/agents/addslot`,data)
  }
  deletingslot(id:string,agentId:string):Observable<any>{
   
    return this.http.delete<any>(`${this.api}/agents/deletingslot?id=${agentId}&slotid=${id}`)
  }
  getAgentdetails(id:string):Observable<any>{
   
    return this.http.get<any>(`${this.api}/agents/agentDetails?id=${id}`)
  }
  availableslots(id:any):Observable<any>{
   
    return this.http.get<any>(`${this.api}/agents/availableslots/${id}`)
  }
  bookingdetails(id:string):Observable<any>{
  
    return this.http.get<any>(`${this.api}/agents/getAllSlots?id=${id}`)
  }
  slotDetailsByOption(agentId:string,status:string):Observable<any>{
    
    return this.http.get<any>(`${this.api}/agents/slotDetailsByOption?id=${agentId}&data=${status}`)
  }
  agentslotcancell(slotId:string,agentId:string):Observable<any>{
    console.log("service get called===>",slotId)
    return this.http.delete<any>(`${this.api}/agents/agentslotcancell?slotId=${slotId}&agentId=${agentId}`)
  }
}