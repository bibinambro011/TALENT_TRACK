import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/Services/socket.service';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent {
  messageRead:boolean=true
  constructor(private router:Router,private socketservice:SocketService){}
  
  
  
}
