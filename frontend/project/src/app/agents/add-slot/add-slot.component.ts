import { Component } from '@angular/core';
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
    private toastr: ToastrService
  ) {
   
  }
  showavailableslots: boolean = true;
  addedslots: any = [];
  date: Date | undefined = new Date();
  selecteddetails: any = {};
  mindate = new Date();
  available_time: string[] = [
    '9 am - 10a m',
    '11 am - 12 pm',
    '2 pm - 3 pm',
    '5 pm - 6 pm',
  ];

  senddateandtime(date: any, time: string) {
    (this.selecteddetails.date = date),
      (this.selecteddetails.time = time),
      this.sendslot();

    this.service.addSlot(this.selecteddetails).subscribe((result) => {
      if (result) {
        this.addedslots = [];
        result.forEach((data: any) => {
          this.addedslots.push(data);
        });
        this.toastr.success('user added successfully');
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
}
