import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentCategoryI, AgentsearchByRegexI, BookingCancelI, BookingI, EditedUserI, RegisterdUserI, Transaction, UserBookingOrderI, UserByIdI, VerifiedAgentsI, logsuccess, successresponsedata, userlog } from '../Model/userModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  private api:string=environment.api


  registerUser(data: any):Observable<RegisterdUserI> {
    return this.http.post<RegisterdUserI>(`${this.api}/users/userregister`, data);
  
  }
  registerAgent(data: any):Observable<any> {
    console.log("service is get called")
    console.log(data)
    return this.http.post<any>(`${this.api}/agents/agentregister`, data);
  
  }
  userlogin(data:userlog):Observable<successresponsedata>{
    console.log(" login service get called and props is ", data)

    return this.http.post<successresponsedata>(`${this.api}/users/userlogin`,data)
  }
  verifyUser(data:any):Observable<string>{
    return this.http.post<string>(`${this.api}/users/verifyotp`,data)
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
  
  getAllverifiedAgents():Observable<VerifiedAgentsI[]>{
    return this.http.get<VerifiedAgentsI[]>(`${this.api}/users/getVerifiedagents`)
  }
  walletpayment(paymentdetails:any):Observable<UserBookingOrderI>{
    console.log("inside service of wallet")
    return this.http.post<UserBookingOrderI>(`${this.api}/users/walletpayment`,paymentdetails)
  }
  userbookingslot(data:any):Observable<UserBookingOrderI>{
    return this.http.post<UserBookingOrderI>(`${this.api}/users/userslotbooking`,data)
  }
  agentCategory(data:any):Observable<AgentCategoryI>{
    
    return this.http.get<AgentCategoryI>(`${this.api}/users/agentCategory?category=${data}`)
  }
  getagentByName(data:string):Observable<AgentsearchByRegexI[]>{
    
    return this.http.get<AgentsearchByRegexI[]>(`${this.api}/users/getagentByName?name=${data}`)
  }
  getUser(id:string):Observable<UserByIdI[]> {
    return this.http.get<UserByIdI[]>(`${this.api}/users/getUserById?id=${id}`)
  }
  userbookings(data:string,id:string):Observable<BookingI[]>{
   
    return this.http.get<BookingI[]>(`${this.api}/users/userbookings?id=${id}&status=${data}`)
  }
  cancelbooking(data:any):Observable<BookingCancelI>{
    return this.http.patch<BookingCancelI>(`${this.api}/users/cancelbooking`,data)
  }
  editUser(data:any):Observable<EditedUserI[]>{
    return this.http.post<EditedUserI[]>(`${this.api}/users/editUser`,data)
  }

  getKey():Observable<string>{
    return this.http.get<string>(`${this.api}/users/getKey`)
  }

  paymentVerification(data:any):Observable<any>{
    console.log("booking data from service==>",data)
    return this.http.post<string>(`${this.api}/users/paymentVerification`,data)
  }



  userTransactionHistory(userId:string):Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.api}/users/userTransactionHistory?userId=${userId}`)
  }


}