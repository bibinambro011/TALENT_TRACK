import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChatService } from 'src/app/Services/chat.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  agentId:string=''
  messageText:string=''
  chatId:string=""
  users:any = [
    
  ];

  chats:any= [
    
  ];

  constructor(private service:ChatService,private store:Store) { }

  ngOnInit(): void {
   this.agentId =localStorage.getItem("agentId") as string
   console.log("agentId is==>",this.agentId)
    this.service.agentAccessChat(this.agentId).subscribe((res)=>{
      if(res instanceof Array)
      res.forEach((data)=>{
    console.log("agentdata is ==>",data)
    this.users.push(data)
    })
    })
  }

  openChatRoom(chatId:string){
    this.chats=[]
    console.log("chatroom is==>",chatId)
    this.chatId=chatId
    this.service.allMessages(chatId).subscribe((data)=>{
      if(data instanceof Array){
        data.forEach((res)=>{
          console.log("response data is==>", res)
          this.chats.push(res)
        })
      }
    })
  }

  onSubmit(data:any){
    let info={
      content:data,
      chatId:this.chatId,
      agentId:this.agentId
    }
    console.log("input val is===>", data)
    this.service.agentsendMessage(info).subscribe((data)=>{
      if(data instanceof Array){
        data.forEach((res)=>{
          console.log("agents message send response==>", res)
          this.chats.push(res)
        })
      }
    })
    
    this.messageText = '';
  }
}
