import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  roomId:string=""
constructor(private router:Router){}

  redirect(){
this.router.navigate(["/user/agentsearch"])
  }
 
}
