import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/Services/agent.service';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent{
   
constructor(private service:AgentService){}
allbookedusers:any
total:number=0
slots:any
totalsessions!:number
refundamount:number=0
   agentId!:any
   totalRecords!:number
   totalrecords:any
   recordCount!:number
ngOnInit(){
 
  this.agentId=localStorage.getItem("agentId") 
  this.loaduserbooking()
  this.loadagentslots()
}
loaduserbooking(){
this.service.getAllslotDetails(this.agentId).subscribe((res)=>{
  if(res instanceof Array){
  
    res.forEach((data)=>{
      if(data.refundamount  )
      this.refundamount+=Number(data.refundamount)
      else{
        this.total+=parseInt(data.bookingamount)
      }
    })
    this.total+=this.refundamount
  }
})
}
async loadagentslots(){
 await this.service.bookedslots(this.agentId).toPromise().then((res)=>{
  this.totalsessions=res.length
  this.slots=[...res]
 })
  this.totalrecords = [...this.slots];
  this.recordCount = this.totalrecords.length;
  this.defaultpaginate();
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
