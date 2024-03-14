import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { SocketService } from 'src/app/Services/socket.service';

@Component({
  selector: 'app-agent-navbar',
  templateUrl: './agent-navbar.component.html',
  styleUrls: ['./agent-navbar.component.css']
})
export class AgentNavbarComponent {
  authenticated:boolean=false
  messageRead:boolean=true
  userId=""
  //  hidden:boolean=true
  constructor(private service:CommonService ,private socketservice:SocketService, private Router:Router){}

  ngOnInit(){
    console.log("authentication function get called")
   if( this.service.getAgentTokenFromLocalStorage()){
    this.authenticated=true
    
   }
   this.socketservice.onMessage().subscribe((res:any)=>{
    if(res.chat.agent===localStorage.getItem('agentId')){
      console.log("inside ==>")
    
      this.messageRead=false
    }
  })
  }
  messageread(){
    this.messageRead=true
    this.Router.navigate(['/agent/agent-chat'])
  }
}
