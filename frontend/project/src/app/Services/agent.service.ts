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
    console.log(" login service get called and props is ", data)

    return this.http.post<any>(`${this.api}/agents/agentlogin`,data)
  }
  
  verifyUser(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/agents/agentverifyotp`,data)
  }
  addSlot(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/agents/addslot`,data)
  }
  
}
