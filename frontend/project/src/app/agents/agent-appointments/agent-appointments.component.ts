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

  recordCount!:number
  totalrecords:any
  totalusers!:string



  agentInfoSubscription: Subscription = new Subscription();
  bookingDetailsSubscription: Subscription = new Subscription();
  slotDetailsSubscription: Subscription = new Subscription();
  agentSlotCancelSubscription: Subscription = new Subscription();
  slotBookingChangeStatusSubscription: Subscription = new Subscription();

  constructor(private store: Store, private service: AgentService) {}

  async bookings() {
    this.service.bookingdetails(this.agentId)
  .toPromise()
  .then((data) => {
    if (data) {
      this.slots = data;
    }
    this.totalrecords = [...this.slots];
    this.recordCount = this.totalrecords.length;
    this.defaultpaginate();
  })
  .catch((error) => {
    // Handle error if needed
    console.error("Error occurred:", error);
  });

  }

  selector() {
    this.agentInfoSubscription = this.store.select(getAgentInfo).subscribe((data) => {
      if (data) {
        this.agentId = data._id;
      }
    });
  }

async  bookingsStatus(data: string) {
    this.slots = [];
   await this.service.slotDetailsByOption(this.agentId, data)
    .toPromise()
    .then((res) => {
      this.slots = res;
    })
    .catch((error) => {
      // Handle error if needed
      console.error("Error occurred:", error);
    });
    this.totalrecords = [...this.slots];
    this.recordCount = this.totalrecords.length;
    this.defaultpaginate()
  }
  defaultpaginate(){
    this.slots=[]
    let currenpage=1;
    let count=5
    let currentPageData:any= this.totalrecords.slice(0,  5);
     currentPageData.forEach((data:any)=>{
      this.slots.push(data)
    })
   
  }

  async cancelSlot(slotid: string) {
    await this.service.agentslotcancell(slotid, this.agentId)
    .toPromise().then((res)=>{
      this.slots=[...res]
      this.totalrecords=this.slots
      
    })
    
    this.defaultpaginate()
  }

  async onRejectConsultChange(status: string, slotId: string) {
  await  this.service.slotbookingchangeStatus(slotId, status, this.agentId).
    toPromise().then((res)=>{
      this.slots=[]
      console.log("response data is -====>", res)
      this.slots=[...res]
      console.log("this. slotsis ==>", this.slots)
      this.totalrecords=[...this.slots]
      
    })
    
    this.defaultpaginate()
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
  paginate(event:any){
    this.slots=[]
    let currenpage=event.page 
    let count=event.first 
    let currentPageData:any= this.totalrecords.slice(count, (currenpage + 1) * 5);
     currentPageData.forEach((data:any)=>{
      this.slots.push(data)
    })
  }
}
