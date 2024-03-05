import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { logsuccess, userlog } from '../Model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  api = 'http://localhost:4000';


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
  getUserTokenFromLocalStorage():string{
    return localStorage.getItem('token') as string;
  }
  getRefreshTokenfromLocalStorage(){
    return localStorage.getItem('refreshtoken') as string;

  }
  generateRefreshToken(){
    let input={
      token:this.getUserTokenFromLocalStorage(),
      refreshtoken:this.getRefreshTokenfromLocalStorage()
    }
    return this.http.post<any>(`${this.api}/users/refreshtoken`,input)
  }
  saveTokenData(tokendata:any){
    localStorage.setItem('token',tokendata.token)
    localStorage.setItem('refreshtoken',tokendata.refreshtoken)
  }
  
  getAllverifiedAgents():Observable<any>{
    return this.http.get<any>(`${this.api}/users/getVerifiedagents`)
  }
  userbookingslot(data:any):Observable<any>{
    return this.http.post<any>(`${this.api}/users/userslotbooking`,data)
  }
  agentCategory(data:any):Observable<any>{
    console.log("inside service", data);
    
    return this.http.get<any>(`${this.api}/users/agentCategory?category=${data}`)
  }
  getagentByName(data:string):Observable<any>{
    console.log("inside service", data);
    
    return this.http.get<any>(`${this.api}/users/getagentByName?name=${data}`)
  }
  getUser(id:string):Observable<any> {
    console.log("inside service==>",id)
    return this.http.get<any>(`${this.api}/users/getUserById?id=${id}`)
  }
  userbookings(data:string,id:string):Observable<any>{
   
    return this.http.get<any>(`${this.api}/users/userbookings?id=${id}&status=${data}`)
  }
  cancelbooking(data:any):Observable<any>{
    console.log("cancelling booking service ",data)
    return this.http.patch<any>(`${this.api}/users/cancelbooking`,data)
  }
  editUser(data:any):Observable<any>{
    console.log("inside service==>",data)
    return this.http.post<any>(`${this.api}/users/editUser`,data)
  }

  getKey():Observable<string>{
    return this.http.get<string>(`${this.api}/users/getKey`)
  }

  paymentVerification(data:any):Observable<any>{
    console.log("booking data from service==>",data)
    return this.http.post<string>(`${this.api}/users/paymentVerification`,data)
  }

  userTransactionHistory(userId:string):Observable<any>{
    return this.http.get<any>(`${this.api}/users/userTransactionHistory?userId=${userId}`)
  }
}
