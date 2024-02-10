import { Component } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-agent-navbar',
  templateUrl: './agent-navbar.component.html',
  styleUrls: ['./agent-navbar.component.css']
})
export class AgentNavbarComponent {
  authenticated:boolean=false
  //  hidden:boolean=true
  constructor(private service:CommonService ){}

  ngOnInit(){
    console.log("authentication function get called")
   if( this.service.getAgentTokenFromLocalStorage()){
    this.authenticated=true
    
   }
  }
}
