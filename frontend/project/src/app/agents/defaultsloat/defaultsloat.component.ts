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
  
  showavailableslots: boolean = true;
  addedslots: any = [];
  date: Date | undefined = new Date();
  selecteddetails: any = {};
  mindate = new Date();
  time:number=60
  endDate:Date |undefined=new Date()
 

  senddateandtime(date: any,enddate:any ) {
    (this.selecteddetails.date = date),
    this.selecteddetails.enddate=enddate,
     
     
      this.sendslot();

    this.adminservice.adddefaultslot(this.selecteddetails).subscribe((result) => {
      if (result) {
        this.addedslots = [];
        result.forEach((data: any) => {
          this.addedslots.push(data);
        });
        this.toastr.success('slot added successfully');
      } else {
        this.toastr.error('failure adding slot');
      }
    });
  }

  //sending agent id to the object that we are going to send to the backend
  sendslot() {
    this.store.select(getAgentInfo).subscribe((res) => {
      this.selecteddetails.id = res._id as string;
      // return res._id as string
    });
  }
 
}
