import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userlog } from '../Model/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  api = 'http://localhost:3000';
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
  userBlock(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/admin/blokUser`,data)
  }
  }

