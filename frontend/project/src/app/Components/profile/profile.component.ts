import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private service :CommonService,private router:Router){}
  hideSidebar: boolean = false;
@Output() eventdata :  EventEmitter<string> = new EventEmitter<string>()
  logout(){
    this.eventdata.emit("data send from profile component")
    localStorage.removeItem("token") 
    this.router.navigate(["/user/login"])
   }
}
