import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }
  api = 'http://localhost:4000';
  getAgentdetails(id:string):Observable<any>{
    console.log("inside service==>",id)
    return this.http.get<any>(`${this.api}/agents/agentDetails?id=${id}`)
  }
}
