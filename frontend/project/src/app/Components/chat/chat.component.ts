import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { allMessage } from 'src/app/Model/chatModel';
import { ChatService } from 'src/app/Services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message !: string;
  messages: string[] = [];
  agentId:string=''
  chatId =localStorage.getItem("userId")
  constructor(private chatService: ChatService,private route:ActivatedRoute ,private store:Store)  { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter from the route
      this.agentId = params['id'];
      console.log('Current route ID:', this.agentId);
    });
    let data={
      userId:localStorage.getItem("userId"),
      agentId:this.agentId
    }
    console.log("after refresh data is===>", data)
    this.chatService.accessChat(data).subscribe((message: any,) => {
     console.log("message is==>",message._id)
     this.chatId=message._id
     this.chatService.allMessages(message._id).subscribe((data:allMessage)=>{
      if(data instanceof Array){
        data.forEach((res)=>{
          this.messages.push(res.content)
        })
      }
   
     })
    });
    
  }

  sendMessage() {
  
    let data={
      content:this.message,
      chatId:this.chatId,
      userId:localStorage.getItem("userId")
    }
  
    this.chatService.sendMessage(data).subscribe((data)=>{
      console.log("message data is ===>",data)
      if(data instanceof Array){
        data.forEach((res)=>{
          this.messages.push(res.content)
        })
      }

    })
    this.message = '';
  }
  submitted = false;

  onSubmit() { 
    this.sendMessage()
    this.submitted = true;
    
   }
}
