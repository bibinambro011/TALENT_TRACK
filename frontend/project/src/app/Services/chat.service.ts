import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { allMessage } from '../Model/chatModel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private api:string='http://localhost:4000'
  constructor(private http: HttpClient) { // Inject HttpClient instead of ChatService
    // Adjust port as per your server configuration
  }

  accessChat(data: any): Observable<any> {
    
    // Send HTTP POST request to the server
   return this.http.post<any>('http://localhost:4000/users/accessChat', data)
  // .subscribe(response => {
  //     // Handle the response if necessary
  //     console.log("response data is===>",response)
  //   });
    
    // Return an observable for receiving socket messages
    // return new Observable(observer => {
    //   this.socket.on('message', (message: any) => {
    //     observer.next(message);
    //   });
    // });
  }

  sendMessage(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/users/sendMessage`,data)
    
    // Emit the message through the socket
     
  }

  // message sended from agent
  agentsendMessage(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/agents/agentsendMessage`,data)
    
    // Emit the message through the socket
    // this.socket.emit('message', message);
  }

  allMessages(chatId:string):Observable<allMessage>{
    return this.http.get<allMessage>(`${this.api}/users/allMessages?id=${chatId}`)
 
  }
  agentallMessages(chatId:string):Observable<any>{
    return this.http.get<allMessage>(`${this.api}/agents/allMessages?id=${chatId}`)
  }

  agentAccessChat(agentId:string){
    return this.http.get<any>(`${this.api}/agents/agentAccessChat?agentId=${agentId}`)
  }
}
