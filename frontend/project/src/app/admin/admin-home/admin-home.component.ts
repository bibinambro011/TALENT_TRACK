import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  sidebarVisible: boolean = true;
  dashboardvisibility !:boolean;
  uservisibility!:boolean;
  agentvisibility!:boolean
  appointement:boolean=false

  
  userdata:any=[]
  visibility:boolean=true
  constructor(private service:AdminService,private router:Router){}

  dashboard(){
   console.log("helloo im from dashboard")
    this.dashboardvisibility=true
    this.uservisibility=false;
    this.agentvisibility=false
    this.sidebarVisible = false;
    this.appointement=false
   
  }
  Appointments(){
    this.dashboardvisibility=false
    this.uservisibility=false;
    this.agentvisibility=false
    this.sidebarVisible=false
    this.appointement=true
  }
  userdetails(){
    this.dashboardvisibility=false
    this.uservisibility=true;
    this.agentvisibility=false
    this.sidebarVisible=false
    this.appointement=false

  
  }
  agentdetails(){
  this.dashboardvisibility=false
    this.uservisibility=false;
    this.agentvisibility=true
    this.sidebarVisible=false
    this.appointement=false

}
logout(){
  localStorage.removeItem("admintoken")
  this.router.navigate(["/admin"])
}

}
