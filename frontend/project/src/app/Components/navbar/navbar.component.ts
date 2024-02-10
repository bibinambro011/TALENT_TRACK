import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   authenticated:boolean=false
  //  hidden:boolean=true
  constructor(private service:CommonService ){}

  ngOnInit(){
    console.log("authentication function get called")
   if( this.service.getUserTokenFromLocalStorage()){
    console.log("inside function of inint", this.service.getUserTokenFromLocalStorage())
    this.authenticated=true
    
   }
  }
  // authenicateddata(data:any){
  
  //   if(data){
  //     console.log("dta send from child",data)
  //     this.authenticated=false
  //   }
  // }
}
