import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
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
  senderId:any
  
  currentPage = 1;
  pageSize = 10; 
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  // Subscriptions
  private agentAccessChatSubscription: Subscription | undefined;
  private allMessagesSubscription: Subscription | undefined;
  private onMessageSubscription: Subscription | undefined;

  constructor(private service: ChatService, private store: Store, private socketservice: SocketService) { }
  @Input() loginSuccess!: boolean;

  ngOnInit(): void {
    console.log("inside onInit")
   this.agentId = localStorage.getItem("agentId") as string;
    this.agentAccessChatSubscription = this.service.agentAccessChat(this.agentId).subscribe((res)=>{
      if(res instanceof Array)
        res.forEach((data)=>{
          this.users.push(data)
        })
    });

this.messageSubscription()
   
  }
  

  messageSubscription(){
    console.log("function get called...")
    this.onMessageSubscription = this.socketservice.onMessage().subscribe((res:any)=>{
      if(res.chat._id==this.chatId){
       
        this.chats.push(res);
      }
      this.senderId=res?.sender?._id
    });
  }

  onScroll(event:any){
    console.log("evenyt is ==>", event)
  }
  openChatRoom(chatId:string,userid:string){
    
    this.chats=[];
   
    this.chatId=chatId;
    this.allMessagesSubscription = this.service.allMessages(chatId).subscribe((data)=>{
     
      if(data instanceof Array){
        data.forEach((res)=>{
          this.chats.push(res);
        });
      }
    });
if(this.senderId==userid){
  console.log("unread message block")
  this.senderId='65eb24beb07854016be47028'
}
   

  }




  
  
  UnreadMessage(Id:string){
    this.senderId=null
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
