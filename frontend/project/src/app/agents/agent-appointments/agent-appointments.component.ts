import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgentService } from 'src/app/Services/agent.service';

import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';

@Component({
  selector: 'app-agent-appointments',
  templateUrl: './agent-appointments.component.html',
  styleUrls: ['./agent-appointments.component.css'],
})
export class AgentAppointmentsComponent {
  selectedOptions: { [key: string]: string } = {};

  selectedOption: any;
  agentId: string = '';
  slots: any = [];
  rejectedOption:any
  constructor(private store: Store,private service:AgentService ) {}

  bookings() {
   this.service.bookingdetails(this.agentId).subscribe((data)=>{
    if(data){
      data.forEach((res:any)=>{
        console.log("responses are==>",res)
        this.slots.push(res)
      })
    }
   })
   console.log("slot are==>", this.slots)
  }
  selector() {
    this.store.select(getAgentInfo).subscribe((data) => {
      if (data) {
        this.agentId = data._id;
      }
    });
  }
  bookingsStatus(data:string){
    console.log("status is ==>", data)
    this.slots=[]
    this.service.slotDetailsByOption(this.agentId,data).subscribe((res)=>{
      if(res){
        res.forEach((data:any)=>{
          this.slots.push(data)
        })
      
      }
    })
    console.log("this slots is===========>",this.slots)
  }cancelSlot(slotid:string){
    this.service.agentslotcancell(slotid,this.agentId).subscribe((res)=>{
      if(res){
        this.slots=[]
        res.forEach((data:any)=>{
          this.slots.push(data)
        })
      }
    })
  }
  onRejectConsultChange(status:string,slotId:string){
    console.log("result is==>", status, "and id is ==>", slotId)
  }
  ngOnInit() {
    this.slots=[]
    this.selector();
   this.bookings()
  }
}
