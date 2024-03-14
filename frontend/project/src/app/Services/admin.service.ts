import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userlog } from '../Model/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  api = 'http://localhost:4000';
  constructor(private http:HttpClient) { }
  adminlogin(data:userlog):Observable<any>{
    return this.http.post<any>(`${this.api}/admin/adminlogin`,data)
  }
  getAllUsers():Observable<any>{
    return this.http.get<any>(`${this.api}/admin/getuserdata`)
  }
  getAllAgents():Observable<any>{
    return this.http.get<any>(`${this.api}/admin/getagentdata`)
  }
  getAllAgentsByCount(count:number,page:number):Observable<any>{
    return this.http.get<any>(`${this.api}/admin/getAllAgentsByCount?count=${count}&page=${page}`)
  }

  userBlock(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/admin/blokUser`,data)
  }
  agentBlock(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/admin/blokagent`,data)
  }
  agentVerify(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/admin/agentVerify`,data)
  }
  adddefaultslot(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/admin/adddefaultslot`,data)
  }
  searchAgents(name:string):Observable<any>{
    console.log("inside service",name)
    return this.http.get<any>(`${this.api}/admin/searchAgents?name=${name}`)
  }
  searchUser(name:string):Observable<any>{
    return this.http.get<any>(`${this.api}/admin/searchUser?name=${name}`)
  }
  adminslots():Observable<any>{
    return this.http.get<any>(`${this.api}/admin/AllSlots`)
  }

}