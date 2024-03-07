import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { allMessage } from 'src/app/Model/chatModel';
import { ChatService } from 'src/app/Services/chat.service';
import { SocketService } from 'src/app/Services/socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message !: string;
  messages: any = [];
  agentId:string=''
  chatId =''
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  constructor(private chatService: ChatService,private route:ActivatedRoute ,private store:Store,private socketService:SocketService)  { }

  ngOnInit() {
   
    this.route.params.subscribe(params => {
      // Access the 'id' parameter from the route
      this.agentId = params['id'];
    });
    let data={
      userId:localStorage.getItem("userId"),
      agentId:this.agentId
    }
    
    this.chatService.accessChat(data).subscribe((message: any,) => {
     this.chatId=message._id
     this.chatService.allMessages(message._id).subscribe((data:allMessage)=>{
      if(data instanceof Array){
        data.forEach((res)=>{
          this.messages.push(res)
        })
      }
   
     })
    });
    this.socketService.onMessage().subscribe((res:any)=>{
      console.log("message resieved on client side==>",res)

      if(res.chat._id==this.chatId){
        console.log("inside")
        this.messages.push(res)
      }
      
    })
    
  }

  sendMessage() {
  
    let data={
      content:this.message,
      chatId:this.chatId,
      userId:localStorage.getItem("userId")
    }
  
    this.chatService.sendMessage(data).subscribe((data)=>{
      console.log("message data is ===>",data)
      this.socketService.messageSendfromClient(data)
     
     
     

    })
    this.message = '';
  }
  submitted = false;

  onSubmit() { 
    this.sendMessage()
    this.submitted = true;
    
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
