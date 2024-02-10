import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent {
  sidebarVisible: boolean = false;
  constructor( private router:Router){}
  logout(){
    localStorage.removeItem('agenttoken');
    this.router.navigate(['/agent/agent-login'])
  }
}
