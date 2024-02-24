import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AgentService } from 'src/app/Services/agent.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';

@Component({
  selector: 'app-agent-profile-page',
  templateUrl: './agent-profile-page.component.html',
  styleUrls: ['./agent-profile-page.component.css'],
})
export class AgentProfilePageComponent implements OnDestroy {
  agentId: string = '';
  agentdetails: any = {};
  private agentInfoSubscription!: Subscription;
  private agentDetailsSubscription!: Subscription;
  showEditOptions: boolean = false;
  profileForm!: FormGroup;

  constructor(
    private service: AgentService,
    private store: Store,
    private fb: FormBuilder,
    private router:Router
  ) {}
  initeditprofile() {
    this.profileForm = this.fb.group({
      firstName: [this.agentdetails.firstName, Validators.required],
      lastName: [this.agentdetails.lastName, Validators.required],
      image: [''],
      category: [this.agentdetails.category],
      experience: [''],
      clubConnections: [''],
    });
    console.log('agent details are===>', this.agentdetails);
  }
  onSubmit() {
    if (this.profileForm.valid) {
    }
    const formData = new FormData();
    formData.append('agentId', this.agentId);
    formData.append('image', this.profileForm.get('image')?.value);
    formData.append(
      'firstName',
      this.profileForm.get('firstName')?.value.toLowerCase()
    );
    formData.append(
      'lastName',
      this.profileForm.get('lastName')?.value.toLowerCase()
    );
    formData.append(
      'category',
      this.profileForm.get('category')?.value.toLowerCase()
    );
    formData.append(
      'experience',
      this.profileForm.get('experience')?.value.toLowerCase()
    );
    formData.append(
      'clubConnections',
      this.profileForm.get('clubConnections')?.value.toLowerCase()
    );
    console.log('form data is===>', formData);
    this.service.editAgent(formData).subscribe((result) => {
      if (result) {
        this.agentdetails = [];
        result.forEach((data: any) => {
          (this.agentdetails.firstName = data.firstName),
            (this.agentdetails.lastName = data.lastName),
            (this.agentdetails.image = data.image),
            (this.agentdetails.category = data.category),
            (this.agentdetails.email = data.email),
            (this.agentdetails.experience = data.experience),
            (this.agentdetails.clubConnections = data.clubConnections);
        });
      }
    });
    this.showEditOptions = false;
  }
  canceleditoption() {
    this.showEditOptions = false;
  }
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get('image')?.setValue(file);
    }
  }

  ngOnInit() {
    this.agentInfoSubscription = this.store
      .select(getAgentInfo)
      .subscribe((res) => {
        if (res) {
          this.agentId = res._id;
          this.getAgentDetails(); // Call the method to fetch agent details when agentInfo is available
        }
      });
    this.initeditprofile();
  }

  ngOnDestroy() {
    if (this.agentInfoSubscription) {
      this.agentInfoSubscription.unsubscribe();
    }
    if (this.agentDetailsSubscription) {
      this.agentDetailsSubscription.unsubscribe();
    }
  }

   getAgentDetails() {
    this.agentDetailsSubscription = this.service
      .getAgentdetails(this.agentId)
      .subscribe((res) => {
        if (res) {
          res.forEach((data: any) => {
            this.agentdetails.firstName = data.firstName;
            this.agentdetails.lastName = data.lastName;
            this.agentdetails.email = data.email;
            this.agentdetails.image = data.image;
            this.agentdetails.category = data.category;
            this.agentdetails.experience = data.experience;
            this.agentdetails.clubConnections = data.clubConnections;
          });
        }
      });
  }
  logoutAgent(){
    localStorage.removeItem("agenttoken") 
    this.router.navigate(["/agent/agent-login"])
  }

 

 
}
