import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/Services/agent.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css'],
})
export class AddSlotComponent {
 
  constructor(
    private store: Store,
    private service: AgentService,
    private toastr: ToastrService,
    private router:Router
  ) {}
  
  showavailableslots: boolean = true;
  addedslots: any = [];
  date: Date | undefined = new Date();
  selecteddetails: any = {};
  mindate = new Date();
  available_time: string[] = [
    '9 am - 10am',
    '10 am - 11 am',
    '11 am - 12 pm',
    '12 pm - 1 pm',
    '1 pm - 2 pm',
    '2 pm - 3 pm',
    '3 pm - 4 pm',
    '4 pm - 5 pm',
    '5 pm - 6 pm',
    '6 pm - 7 pm',
    '7pm - 8 pm'
  ];

  senddateandtime(date: any, time: string,index:any) {
    (this.selecteddetails.date = date),
      (this.selecteddetails.time = time),

      this.available_time.splice(index,1)
      this.sendslot();

    this.service.addSlot(this.selecteddetails).subscribe((result) => {
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
  cancelSlot(id: any) {
    id = id as string;
    let agentId = this.selecteddetails.id;

    this.service.deletingslot(id, agentId).subscribe((res) => {
      if (res) {
        this.addedslots = [];
        res.forEach((data: any) => {
          this.addedslots.push(data);
        });
        this.toastr.success('slot deleted successfully');
      } else {
        this.toastr.error('failure deleting slot');
      }
    });
  }
  addDefaultSlot(){
    this.router.navigate(['/agent/agent-defaultslotadd'])
  }
}
