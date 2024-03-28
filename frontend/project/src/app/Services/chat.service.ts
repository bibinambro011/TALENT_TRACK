import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Chat, FullChatI, UserAccessChatI, agentSendMessageI, allMessage, usersendMessage } from '../Model/chatModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private api:string=environment.api
  constructor(private http: HttpClient) {}

  accessChat(allchat: any): Observable<FullChatI | UserAccessChatI> {
    
    // Send HTTP POST request to the server
   return this.http.post<FullChatI | UserAccessChatI>(`${this.api}/users/accessChat`, allchat)
  
  }

  sendMessage(message: any): Observable<usersendMessage> {
    return this.http.post<usersendMessage>(`${this.api}/users/sendMessage`,message)
    
    // Emit the message through the socket
     
  }

  // message sended from agent
  agentsendMessage(message: any): Observable<agentSendMessageI> {
    return this.http.post<agentSendMessageI>(`${this.api}/agents/agentsendMessage`,message)
    
   
  }

  allMessages(chatId:string):Observable<allMessage>{
    return this.http.get<allMessage>(`${this.api}/users/allMessages?id=${chatId}`)
 
  }
  agentallMessages(chatId:string):Observable<any>{
    return this.http.get<allMessage>(`${this.api}/agents/allMessages?id=${chatId}`)
  }

  agentAccessChat(agentId:string):Observable<Chat>{
    return this.http.get<Chat>(`${this.api}/agents/agentAccessChat?agentId=${agentId}`)
  }
}
