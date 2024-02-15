
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/Services/agent.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';



@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent {
  constructor(private store:Store,private service:AgentService,private toastr:ToastrService){}
    date: Date | undefined=new Date()
    selecteddetails:any={} 
    mindate=new Date()
    available_time:string[]=['9 am - 10a m','10 am -  11 am','11 am - 12 pm','2 pm - 3 pm','3 pm - 4 pm','4pm -5 pm','5 pm - 6 pm','6 pm - 7 pm']
   

    selectedDate(event:any){
     
        console.log(event); // This is your date in string format
    }
    senddateandtime(date:any,time:string){
     
      this.selecteddetails.date=date,
      this.selecteddetails.time=time,
     this.sendslot()
     console.log(this.selecteddetails)
     this.service.addSlot(this.selecteddetails).subscribe((result)=>{
      console.log("resulted data is==>",result)
      if(result){
        this.toastr.success("user added successfully")
      }else{
        this.toastr.error("failure adding slot")
      }
     })
   
    }

    //sending agent id to the object that we are going to send to the backend
    sendslot(){
      this.store.select(getAgentInfo).subscribe((res)=>{
        this.selecteddetails.id=res._id as string
      
      })
    }
    
}
