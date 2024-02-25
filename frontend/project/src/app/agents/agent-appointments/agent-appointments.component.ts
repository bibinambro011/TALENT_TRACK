import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AgentService } from 'src/app/Services/agent.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';

@Component({
  selector: 'app-agent-appointments',
  templateUrl: './agent-appointments.component.html',
  styleUrls: ['./agent-appointments.component.css'],
})
export class AgentAppointmentsComponent implements OnDestroy {
  selectedOptions: { [key: string]: string } = {};
  selectedOption: any;
  agentId: string = '';
  slots: any = [];
  rejectedOption: any;
  agentInfoSubscription: Subscription = new Subscription();
  bookingDetailsSubscription: Subscription = new Subscription();
  slotDetailsSubscription: Subscription = new Subscription();
  agentSlotCancelSubscription: Subscription = new Subscription();
  slotBookingChangeStatusSubscription: Subscription = new Subscription();

  constructor(private store: Store, private service: AgentService) {}

  bookings() {
    this.bookingDetailsSubscription = this.service.bookingdetails(this.agentId).subscribe((data) => {
      if (data) {
        data.forEach((res: any) => {
          this.slots.push(res);
        });
      }
    });
  }

  selector() {
    this.agentInfoSubscription = this.store.select(getAgentInfo).subscribe((data) => {
      if (data) {
        this.agentId = data._id;
      }
    });
  }

  bookingsStatus(data: string) {
    this.slots = [];
    this.slotDetailsSubscription = this.service.slotDetailsByOption(this.agentId, data).subscribe((res) => {
      if (res) {
        res.forEach((data: any) => {
          this.slots.push(data);
        });
      }
    });
  }

  cancelSlot(slotid: string) {
    this.agentSlotCancelSubscription = this.service.agentslotcancell(slotid, this.agentId).subscribe((res) => {
      if (res) {
        this.slots = [];
        res.forEach((data: any) => {
          this.slots.push(data);
        });
      }
    });
  }

  onRejectConsultChange(status: string, slotId: string) {
    this.slotBookingChangeStatusSubscription = this.service.slotbookingchangeStatus(slotId, status, this.agentId).subscribe((data) => {
      if (data) {
        this.slots = [];
        data.forEach((res: any) => {
          this.slots.push(res);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.agentInfoSubscription.unsubscribe();
    this.bookingDetailsSubscription.unsubscribe();
    this.slotDetailsSubscription.unsubscribe();
    this.agentSlotCancelSubscription.unsubscribe();
    this.slotBookingChangeStatusSubscription.unsubscribe();
  }

  ngOnInit() {
    this.slots = [];
    this.selector();
    this.bookings();
  }
}
