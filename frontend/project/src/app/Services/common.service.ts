import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }
   // get the email from local storage for the resend otp action
   getEmailFromLocalStorage():string{
    return localStorage.getItem('email') as string;
  }
  // get the role from local storage when we are using the same otp page to identify which user is currently on that page
  getRoleFromLocalStorage():string{
    return localStorage.getItem('role') as string;
  }
  // get the mentee token from local storage
  getUserTokenFromLocalStorage():string{
    return localStorage.getItem('token') as string;
  }
  // get the mentor token from local storage
  getAgentTokenFromLocalStorage():string{
    return localStorage.getItem('agenttoken') as string;
  }
  // get the admin token from local storage
  getAdminTokenFromLocalStorage():string{
    return localStorage.getItem('admintoken') as string;
  }
  
}
