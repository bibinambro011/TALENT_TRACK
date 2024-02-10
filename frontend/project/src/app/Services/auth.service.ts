import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private service:CommonService) { }

  
  checkUserloggedIn(){
    const userToken=this.service.getUserTokenFromLocalStorage()
    return !!userToken
  }
checkagentLoggedIn(){
  const agentToken=this.service.getAgentTokenFromLocalStorage()
  return !! agentToken
}
}
