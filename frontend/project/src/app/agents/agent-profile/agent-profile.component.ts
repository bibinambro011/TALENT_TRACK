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
  dashboardshow:boolean=false
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('agenttoken');
    this.router.navigate(['/agent/agent-login']);
  }
  dashboard() {
    this.dashboardshow=true
    this.showappointments=false;
    this.sidebarVisible = false;
    this.profilepage=false
    this.addpost = false;
  }
  addSlot() {
    this.showappointments=false;
    this.dashboardshow=false
    this.addpost = true;
    this.profilepage=false
    this.sidebarVisible = false;
  }
  
  profile(){
    this.dashboardshow=false
    this.showappointments=false;
    this.sidebarVisible = false;
    this.profilepage=true
    this.addpost = false;
    
  }
  Appontments(){
    this.dashboardshow=false
    this.addpost = false;
    this.profilepage=false
    this.sidebarVisible = false;
    this.showappointments=true;
    
  }
  chat(){
    this.router.navigate(["/agent/agent-chat"])
  }
}
