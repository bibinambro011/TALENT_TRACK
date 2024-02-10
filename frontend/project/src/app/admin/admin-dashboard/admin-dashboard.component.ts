import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private service:AdminService){}
  usercount!:any
  agentcount:any

  ngOnInit(){
    this.service.getAllUsers().subscribe((result)=>{
      if(result){
        console.log("result is==>",result.length)
        this.usercount=result.length
      }
    })
    this.service.getAllAgents().subscribe((result)=>{
      if(result){
        console.log("result is==>",result.length)
        this.agentcount=result.length
      }
    })
  }
}
