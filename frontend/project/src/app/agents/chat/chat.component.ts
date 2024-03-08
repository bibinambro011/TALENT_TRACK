import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { ChatService } from 'src/app/Services/chat.service';
import { SocketService } from 'src/app/Services/socket.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnDestroy {
  agentId:string='';
  messageText:string='';
  chatId:string='';
  users:any = [];
  chats:any= [];
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  // Subscriptions
  private agentAccessChatSubscription: Subscription | undefined;
  private allMessagesSubscription: Subscription | undefined;
  private onMessageSubscription: Subscription | undefined;

  constructor(private service: ChatService, private store: Store, private socketservice: SocketService) { }

  ngOnInit(): void {
   this.agentId = localStorage.getItem("agentId") as string;
    this.agentAccessChatSubscription = this.service.agentAccessChat(this.agentId).subscribe((res)=>{
      if(res instanceof Array)
        res.forEach((data)=>{
          this.users.push(data)
        })
    });
  }

  openChatRoom(chatId:string){
    this.chats=[];
   
    this.chatId=chatId;
    this.allMessagesSubscription = this.service.allMessages(chatId).subscribe((data)=>{
     
      if(data instanceof Array){
        data.forEach((res)=>{
          this.chats.push(res);
        });
      }
    });

    this.onMessageSubscription = this.socketservice.onMessage().subscribe((res:any)=>{
      if(res.chat._id==this.chatId){
        console.log("res-->",res);
        this.chats.push(res);
      }
    });
  }

  onSubmit(data:any){
    let val=data.trim().length
    if(val ==0){
      return
    }
    let info={
      content:data,
      chatId:this.chatId,
      agentId:this.agentId
    };
    this.service.agentsendMessage(info).subscribe((data)=>{
      this.socketservice.messageSendfromAgent(data);
    });
    this.messageText = '';
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.agentAccessChatSubscription?.unsubscribe();
    this.allMessagesSubscription?.unsubscribe();
    this.onMessageSubscription?.unsubscribe();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
