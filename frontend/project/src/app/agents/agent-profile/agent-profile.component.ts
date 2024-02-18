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
  profilepage:boolean=false
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('agenttoken');
    this.router.navigate(['/agent/agent-login']);
  }
  dashboard() {}
  posts() {
    this.sidebarVisible = false;
    this.router.navigate(['/agent/post']);
  }
  Players() {}
  Appointments() {
    this.addpost = true;
    this.profilepage=false
    this.sidebarVisible = false;
  }
  profile(){
    this.sidebarVisible = false;
    this.profilepage=true
    this.addpost = false;
    this.router.navigate(["/agent/gent-profile-page"])
  }
}
