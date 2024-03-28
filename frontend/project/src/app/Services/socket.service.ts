import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private api:string=environment.api
  private socket:Socket
  constructor() { 
    this.socket=io(`${this.api}`)
  }
  sendMessage(message: any): void {
    this.socket.emit('newMessage',(message));
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('messageReceived', (data: any) => {
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
