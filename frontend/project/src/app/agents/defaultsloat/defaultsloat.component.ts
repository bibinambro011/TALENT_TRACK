import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin.service';
import { AgentService } from 'src/app/Services/agent.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';

@Component({
  selector: 'app-defaultsloat',
  templateUrl: './defaultsloat.component.html',
  styleUrls: ['./defaultsloat.component.css']
})
export class DefaultsloatComponent {

  constructor(
    private store: Store,
    private service: AgentService,
    private toastr: ToastrService,
    private adminservice:AdminService
  ) {}
  selectedTime!:string
  addedslots: any[] = [];
  hours: string[] = [ '9 am - 10am',
  '10 am - 11 am',
  '11 am - 12 pm',
  '12 pm - 1 pm',
  '1 pm - 2 pm',
  '2 pm - 3 pm',
  '3 pm - 4 pm',
  '4 pm - 5 pm',
  '5 pm - 6 pm',
  '6 pm - 7 pm',
  '7pm - 8 pm'];
  showavailableslots: boolean = true;
  
  date: Date | undefined = new Date();
  selecteddetails: any = {};
  mindate = new Date();
  time:number=60
  endDate:Date |undefined=new Date()
 

  
  senddateandtime(date: any,enddate:any ) {
    this.selecteddetails.startdate = date,
    this.selecteddetails.enddate=enddate,
    this.selecteddetails.time=this.selectedTime
    this.selecteddetails.agentId=localStorage.getItem("agentId")
     
     
      
      console.log("=====>", this.selecteddetails)

    this.adminservice.adddefaultslot(this.selecteddetails).subscribe((result) => {
      if (result) {
        console.log("result is==>", result)
        this.toastr.success('slot added successfully');
      } else {
        this.toastr.error('failure adding slot');
      }
    });
  }

  //sending agent id to the object that we are going to send to the backend
 
 
}
