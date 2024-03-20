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
  slots:any
  totalAmount:number=0
  totalrecords:any
  totalcount!:number
  

  ngOnInit(){
    
    this.getAllUsers()
    this.getAllUsers()
    this.getAllAgents()
    this.getallslots()
   
  }
  async getallslots(){
    await this.service.confirmedslots().toPromise().then((res)=>{
      this.slots=[...res]
      this.totalrecords=this.slots
      res.forEach((item:any)=>{
        if(item.adminpaidAmount){
          this.totalAmount+=Number(item.adminpaidAmount)
        }

      })
    })
    this.totalcount=this.totalrecords.length
    this.defaultpaginate()
  }
  getAllUsers(){
    this.service.getAllUsers().subscribe((result)=>{
      if(result){
     
        this.usercount=result.length
      }
    })
    
  }
  getAllAgents(){
    this.service.getAllAgents().subscribe((result)=>{
      if(result){
       
        this.agentcount=result.length
      }
    })
   this.getallslots()
  }
  
  paginate(event:any){
    this.slots=[]
    let currenpage=event.page 
    let count=event.first 
    let currentPageData:any= this.totalrecords.slice(count, (currenpage + 1) * 6);
     currentPageData.forEach((data:any)=>{
      this.slots.push(data)
    })
  }
  
  defaultpaginate(){
    this.slots=[]
    let currenpage=1;
    let count=5
    let currentPageData:any= this.totalrecords.slice(0,  6);
     currentPageData.forEach((data:any)=>{
      this.slots.push(data)
    })
   
  }
 

  }
  
 

