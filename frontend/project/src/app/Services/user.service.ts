import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { logsuccess, userlog } from '../Model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  api = 'http://localhost:3000';

  registerUser(data: any):Observable<any> {
    console.log("service is get called")
    console.log(data)
    return this.http.post<any>(`${this.api}/users/userregister`, data);
  
  }
  registerAgent(data: any):Observable<any> {
    console.log("service is get called")
    console.log(data)
    return this.http.post<any>(`${this.api}/agents/agentregister`, data);
  
  }
  userlogin(data:userlog):Observable<any>{
    console.log(" login service get called and props is ", data)

    return this.http.post<any>(`${this.api}/users/userlogin`,data)
  }
  verifyUser(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/users/verifyotp`,data)
  }
}
