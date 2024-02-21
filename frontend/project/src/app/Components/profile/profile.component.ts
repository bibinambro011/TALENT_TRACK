import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserInfo } from 'src/app/store/userStore/userSelector';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent implements OnInit {
  sidebarVisible:boolean=true;
  showdashboard:boolean=false
  showprofile:boolean=false;
  showappointments:boolean=false;
  id:any
  selectedOption:any
  user:any[]=[];
  userbookings:any[]=[]
  constructor(private service :CommonService,private router:Router,private store:Store,private userservice:UserService){}
  
@Output() eventdata :  EventEmitter<string> = new EventEmitter<string>()
  logout(){
    this.eventdata.emit("data send from profile component")
    localStorage.removeItem("token") 
    this.router.navigate(["/user/login"])
   }
   dashboard(){
    this.showdashboard=true;
    this.showprofile=false;
    this.sidebarVisible=false;

   }
   Appointments(){
    this.showappointments=true
    this.showdashboard=false;
    this.sidebarVisible=false;
    this.showprofile=false
   }
   profile(){
    this.showprofile=false;
    this.showdashboard=false;
    this.sidebarVisible=false;
    this.showprofile=true
    console.log("clicked profile")
   }

   // fetch bookins details

   bookings(data:string){
    this.userbookings=[]
    console.log("function get called bookings")
    this.userservice.userbookings(data,this.id).subscribe((res)=>{
      if(res){
        this.userbookings.push(res)
      }
    })
    console.log("====>",this.userbookings)
   }

   ngOnInit(){
    console.log("inint function get called")
   
    this.store.select(getUserInfo).subscribe((data)=>{
      if(data){
       this.id=data._id
      }
    })
    this.userservice.getUser(this.id).subscribe((res)=>{
      if(res){
        res.forEach((data:any)=>{
          this.user.push(data)
        })
      }
    })

    console.log("userc details are==>",this.user)
   }
}
