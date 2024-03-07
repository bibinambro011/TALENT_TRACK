import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:Socket
  constructor() { 
    this.socket=io("http://localhost:4000")
  }
  sendMessage(message: any): void {
    this.socket.emit('newMessage',(message));
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('messageReceived', (data: any) => {
        console.log("res.data from service",data)
        observer.next(data);
      });
    });
  }
  messageSendfromClient(data:any){
    this.socket.emit('newMessage',(data));
  }
  messageSendfromAgent(data:any){
    this.socket.emit('newMessage',(data));

  }
  
}
