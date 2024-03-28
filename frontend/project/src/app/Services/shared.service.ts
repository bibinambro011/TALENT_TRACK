import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }
  private api:string=environment.api
 
  getAgentdetails(id:string):Observable<any>{
    console.log("inside service==>",id)
    return this.http.get<any>(`${this.api}/agents/agentDetails?id=${id}`)
  }
}
