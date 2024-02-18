import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AgentService } from 'src/app/Services/agent.service';
import { ToasterService } from 'src/app/Services/toaster.service';
import { UserService } from 'src/app/Services/user.service';
import { getUserInfo } from 'src/app/store/userStore/userSelector';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent {
  @Input() searchagentdata:any
  allotedTime:any=[]
  hideSidebar:boolean=false
  slots:any[]=[]
  date:Date=new Date()
  minDate:Date=new Date()
 
  
  constructor(private agentservice:AgentService,private store:Store,private userservice:UserService,private toastr:ToasterService){}

  availableslots(id:any){
   
    this.slots=[]
   this.agentservice.availableslots(id).subscribe((res)=>{
    
    if(res){
      res.forEach((data:any)=>{
       
        this.slots.push(data)
      })
    }
   })
   console.log("from function ",this.slots)
  }
  
getUserId(){
  let userId
  this.store.select(getUserInfo).subscribe((res)=>{
    console.log("this is a response from selector",res);
    userId=res._id
   })
   return userId
}
  //slot book
  userslotbook(data:any){
    let userid=this.getUserId()
    const obj={
      slotId:data._id,
      agentId:data.agentId,
      userId:userid,
      time:data.time,
      date:data.date,
    }
    this.userservice.userbookingslot(obj).subscribe((data)=>{
      if(data){
        this.slots=[]
        data.forEach((res:any)=>{
          this.slots.push(res)
        })
        this.toastr.success('slot booked successfully')
      }else{
        this.toastr.error('failure book slot')
      }
    })
  }


  ngOnInit(){
   
  }
}
