import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserInfo } from 'src/app/store/userStore/userSelector';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = true;
  showdashboard: boolean = false;
  showprofile: boolean = false;
  showappointments: boolean = false;
  id: any;
  selectedOption: any;
  user: any[] = [];
  userbookings: any[] = [];
  editedUser: any;
  editMode: boolean = false;
  uploadForm!: FormGroup;
  filedvalue: string = 'bibin';
  
  transactions:any=[]
  eventdata: EventEmitter<string> = new EventEmitter<string>();
  logoutSubscription: Subscription = new Subscription();
  userInfoSubscription: Subscription = new Subscription();
  userBookingsSubscription: Subscription = new Subscription();

  constructor(
    private service: CommonService,
    private router: Router,
    private store: Store,
    private userservice: UserService,
    private formBuilder: FormBuilder
  ) {}

  logout() {
    this.eventdata.emit('data send from profile component');
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  dashboard() {
    this.transactions=[]
    this.visibilityhandle();
    this.showdashboard = true;
    this.userservice.userTransactionHistory(this.id).subscribe((data)=>{
      if(data instanceof Array){
        data.forEach((res)=>{
          this.transactions.push(res)
        })
      }
    })

  }

  Appointments() {
    this.visibilityhandle();
    this.showappointments = true;
  }

  profile() {
    this.visibilityhandle();
    this.showprofile = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  editprofile() {
    
    console.log("edited clicked==>",this.user)
    this.visibilityhandle;
    this.editMode = true;
    this.showprofile = true;
  }

  // creating a common function hor conditionally displaying the nnecessary fileds

  visibilityhandle() {
    this.editMode = false;
    this.showprofile = false;
    this.showdashboard = false;
    this.sidebarVisible = false;
    this.showprofile = false;
    this.showappointments = false;
  }
  bookings(data: string) {
    this.visibilityhandle();
    this.showappointments = true;
    this.userbookings = [];
    this.userBookingsSubscription = this.userservice
      .userbookings(data, this.id)
      .subscribe((res) => {
        if (res) {
          this.userbookings.push(res);
        }
      });
  }

  // booking cancellation from the user side

  cancelbooking(data: string, userId: string, status: string,paymentId:string,slotId:string): void {
    let details = {
      id: data,
      userid: userId,
      status: status,
      paymentId:paymentId,
      slotId:slotId
    };

    // Show the custom alert
    this.showCustomAlert().then((result) => {
      if (result.isConfirmed) {
        this.userbookings = [];
        this.userservice.cancelbooking(details).subscribe((res) => {
          if (res) {
            this.userbookings.push(res);
          }
        });
      }
    });
  }

  showCustomAlert(): Promise<any> {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel the booking',
    });
  }

  initForm(): void {
    console.log("user profile=>", this.user)
    this.uploadForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      image: [null, Validators.required], // Change to null for file type
    });
  }

  
// called this functiin when the form is get submitted

  onSubmit() {
    if (this.uploadForm.invalid) {
      return;
    }
    this.user = [];
    const formData = new FormData();
    formData.append('userId', this.id);
    formData.append('image', this.uploadForm.get('image')?.value);
    formData.append(
      'firstName',
      this.uploadForm.get('firstName')?.value.toLowerCase()
    );
    formData.append(
      'lastName',
      this.uploadForm.get('lastName')?.value.toLowerCase()
    );
    this.userservice.editUser(formData).subscribe((result) => {
      if (result) {
        result.forEach((data: any) => {
          this.user.push(data);
        });
      }
    });
    this.editMode = false;
  }
// getting the image
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image')?.setValue(file);
    }
  }
  ngOnInit() {
    this.initForm();
    this.userInfoSubscription = this.store
      .select(getUserInfo)
      .subscribe((data) => {
        if (data) {
          this.id = data._id;
        }
      });

      // getting userdetails by passing user id, which is saved globally

    this.userservice.getUser(this.id).subscribe((res) => {
      if (res) {
        res.forEach((data: any) => {
          this.user.push(data);
        });
      }
    });
    
  }

// unsubscribing all the observables while leaving the component 

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
    this.userInfoSubscription.unsubscribe();
    this.userBookingsSubscription.unsubscribe();
  }
}
