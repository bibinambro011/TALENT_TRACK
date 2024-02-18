import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AgentService } from 'src/app/Services/agent.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';

@Component({
  selector: 'app-agent-profile-page',
  templateUrl: './agent-profile-page.component.html',
  styleUrls: ['./agent-profile-page.component.css']
})
export class AgentProfilePageComponent implements OnDestroy {
  agentId: string = "";
  agentdetails: any = {};
  private agentInfoSubscription !: Subscription;
  private agentDetailsSubscription !: Subscription;

  constructor(private service: AgentService, private store: Store) {}

  ngOnInit() {
    this.agentInfoSubscription = this.store.select(getAgentInfo).subscribe((res) => {
      if (res) {
        this.agentId = res._id;
        this.getAgentDetails(); // Call the method to fetch agent details when agentInfo is available
      }
    });
  }

  ngOnDestroy() {
    if (this.agentInfoSubscription) {
      this.agentInfoSubscription.unsubscribe();
    }
    if (this.agentDetailsSubscription) {
      this.agentDetailsSubscription.unsubscribe();
    }
  }

  private getAgentDetails() {
    this.agentDetailsSubscription = this.service.getAgentdetails(this.agentId).subscribe((res) => {
      if (res) {
       res.forEach((data:any)=>{
        this.agentdetails.firstName=data.firstName
        this.agentdetails.email=data.email
        this.agentdetails.image=data.image

       })
      
      }
    });
  }
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  closeDialog() {
      this.visible = false;
  }
}