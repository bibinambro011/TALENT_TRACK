import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css'],
})
export class AgentProfileComponent {
  addpost: boolean = false;
  sidebarVisible: boolean = true;
  profilepage:boolean=false;
  showappointments:boolean=false
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('agenttoken');
    this.router.navigate(['/agent/agent-login']);
  }
  dashboard() {
  }
  addSlot() {
    this.showappointments=false;
    this.addpost = true;
    this.profilepage=false
    this.sidebarVisible = false;
  }
  
  profile(){
    this.showappointments=false;
    this.sidebarVisible = false;
    this.profilepage=true
    this.addpost = false;
    
  }
  Appontments(){
    this.addpost = false;
    this.profilepage=false
    this.sidebarVisible = false;
    this.showappointments=true;
    
  }
  chat(){
    this.router.navigate(["/agent/agent-chat"])
  }
}
