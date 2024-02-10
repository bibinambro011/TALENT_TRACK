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
  
  userdata:any=[]
  visibility:boolean=true
  constructor(private service:AdminService,private router:Router){}

  dashboard(){
    console.log("hello guys")
    this.router.navigate(["/admin/admin-dashboard"])
  }
  userdetails(){
   this.router.navigate(["/admin/admin-allusers"])
  }
admindetails(){

}
logout(){
  
}

}
